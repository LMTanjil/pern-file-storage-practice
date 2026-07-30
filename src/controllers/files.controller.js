// src/controllers/files.controller.js
import {fetchAllFiles, fetchFileById, processUpload} from '../services/files.service.js';

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

export const getAllFilesHandler = async (req, res) => {
    try {
        const files = await fetchAllFiles();
        res.status(200).json({
            count: files.length,
            files: files
        });
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getFileByIdHandler = async (req, res) => {
    try{
        const {id} = req.params;
        const file = await fetchFileById(id);
        res.status(200).json({file})

    }catch (error) {
        if(error.message.includes('File not found')) {
            res.status(404).json({error: error.message});
        }
        res.status(500).json({ error: error.message });
    }
}