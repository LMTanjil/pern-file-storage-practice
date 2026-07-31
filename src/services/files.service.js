import {cloudinary} from '../config/cloudinary.config.js';
import {getAllFiles, getFileById, getOlderFileThan30Days, getTrashFile, insertFile, restoreFile, softDelete,permanentlyDeleteFile} from "../repositories/files.repository.js";
import {formatFileSize} from "../utils/formatFileSize.js";
import {AppError} from "../utils/AppError.js";

export const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {folder: 'pern-file-storage-practice'},
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
        stream.end(fileBuffer);
    });
}

export const processUpload = async (file) => {
    const cloudinaryResult = await uploadToCloudinary(file.buffer)
    const size = formatFileSize(file.size);

    return await insertFile(
        file.originalname,
        cloudinaryResult.secure_url,
        cloudinaryResult.public_id,
        size
    );
}

export const processUploadMultiple = async (files) => {
    const uploadPromise = files.map(async (file) => {
        const cloudinaryResult = await uploadToCloudinary(file.buffer)
        const size = formatFileSize(file.size);
        return await insertFile(
            file.originalname,
            cloudinaryResult.secure_url,
            cloudinaryResult.public_id,
            size
        )
        }

    )
    return await Promise.all(uploadPromise)
}

export const fetchAllFiles = async () => {
    return await getAllFiles();
}

export const fetchFileById = async (id) => {
    const file = await getFileById(id);
    if (!file) {
        throw new AppError(`Could not found file`,404);
    }
    return file;
}

export const deleteFile = async (id) => {
    const deleteFile = await softDelete(id);
    if (!deleteFile) {
        throw new AppError(`File not found or already deleted`,404);
    }
    return deleteFile;
}

export const restoredDeletedFile = async (id) => {
    const restored = await restoreFile(id);
    if (!restored) {
        throw new AppError('File not found or already deleted', 404);
    }
    return restored;
}

export const fetchTrashFiles = async () => {
    return await getTrashFile();
}

export const cleanupOldTrash = async () => {
    const OldFiles = await getOlderFileThan30Days()
    // console.log('Old files:', OldFiles);
    const results = [];
    for (const file of OldFiles) {
        try{
            await cloudinary.uploader.destroy(file.public_id);
            await permanentlyDeleteFile(file.id);
            results.push({
                id: file.id,
                status: 'deleted successfully',
            })
        }catch(err){
            results.push({
                id: file.id,
                status: 'deleted failed',
                error: err.message,
            })
        }
    }
    return results;
}
