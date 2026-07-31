import express from 'express';
import {upload} from "../middlewares/files.middleware.js";
import {
    cleanupTrashHandler,
    deleteFileHandler,
    getAllFilesHandler,
    getFileByIdHandler,
    getTrashFilesHandler,
    restoreFileHandler,
    uploadMultiple,
    uploadSingle
} from "../controllers/files.controller.js";

const router = express.Router();

router.get("/",getAllFilesHandler);
router.get("/trash",getTrashFilesHandler)
router.get("/:id", getFileByIdHandler);
router.post("/upload-single", upload.single("image"), uploadSingle);
router.post ("/upload-multiple", upload.array("image", 5), uploadMultiple);
router.patch("/:id/restore", restoreFileHandler);
router.delete("/cleanup", cleanupTrashHandler)
router.delete('/:id', deleteFileHandler);


export default router;