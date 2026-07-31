// src/controllers/files.controller.js
import {cleanupOldTrash, deleteFile, fetchAllFiles, fetchFileById, fetchTrashFiles, processUpload, processUploadMultiple, restoredDeletedFile} from '../services/files.service.js';

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

export const uploadMultiple = async (req, res) => {
    try{
        if(!req.files || req.files.length === 0) return res.status(400).json({ error: 'No files uploaded' });
        const records = await processUploadMultiple(req.files);
        res.status(200).json({
            message: 'Upload successful',
            count: records.length,
            files: records

        })
    }catch(err){
        res.status(500).json({ error: 'Error uploading files' });
    }
}

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
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

export const deleteFileHandler = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedFile = await deleteFile(id);
        res.status(200).json({
            message: 'File deleted',
            file: deletedFile
        })
    }catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

export const restoreFileHandler = async (req, res) => {
    try{
        const {id} = req.params;
        const restoredFile = await restoredDeletedFile(id);
        res.status(200).json({
            message: 'Restored file successfully',
            file: restoredFile
        })
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
}

export  const getTrashFilesHandler = async (req, res) => {
    try{
        const files = await fetchTrashFiles();
        res.status(200).json({
            count: files.length,
            files: files
        });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const cleanupTrashHandler = async (req, res) => {
    try{
        const result = await cleanupOldTrash();
        res.status(200).json({
            message: 'Cleaned trash',
            processed: result.length,
            result: result
        })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}