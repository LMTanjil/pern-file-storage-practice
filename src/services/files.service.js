import {cloudinary} from '../config/cloudinary.config.js';
import {getAllFiles, getFileById, insertFile} from "../repositories/files.repository.js";
import {formatFileSize} from "../utils/formatFileSize.js";

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

export const fetchAllFiles = async () => {
    return await getAllFiles();
}

export const fetchFileById = async (id) => {
    const file = await getFileById(id);
    if (!file) {
        throw new Error(`Could not found file`);
    }
    return file;
}
