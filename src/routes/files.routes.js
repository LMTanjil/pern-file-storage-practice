import express from 'express';
import {upload} from "../middlewares/files.middleware.js";
import {getAllFilesHandler, getFileByIdHandler, uploadSingle} from "../controllers/files.controller.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadSingle);
router.get("/files",getAllFilesHandler);
router.get("/files/:id", getFileByIdHandler);

export default router;