import express from 'express';
import {upload} from "../middlewares/files.middleware.js";
import {deleteFileHandler, getAllFilesHandler, getFileByIdHandler, restoreFileHandler, uploadMultiple, uploadSingle} from "../controllers/files.controller.js";

const router = express.Router();

router.get("/files",getAllFilesHandler);
router.get("/files/:id", getFileByIdHandler);
router.post("/files/upload-single", upload.single("image"), uploadSingle);
router.post ("/files/upload-multiple", upload.array("image", 5), uploadMultiple);
router.patch("/files/:id/restore", restoreFileHandler);
router.delete('/files/:id', deleteFileHandler);


export default router;