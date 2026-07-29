// src/controllers/upload.controller.js
import { processUpload } from '../services/upload.service.js';

export const uploadSingle = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const record = await processUpload(req.file);

        res.status(200).json({
            message: 'Upload successful',
            file: record
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};