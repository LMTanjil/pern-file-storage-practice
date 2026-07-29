import {cloudinary} from '../config/cloudinary.config.js';


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