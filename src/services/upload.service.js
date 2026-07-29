import {cloudinary} from '../config/cloudinary.config.js';
import {insertFile} from "../repositories/upload.repository.js";
import {formatFileSize}from "../utils/formatFileSize.js";

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

    const record = await insertFile(
        file.originalname,
        cloudinaryResult.secure_url,
        cloudinaryResult.public_id,
        size
    );

    return record;
}