import express from 'express';
import {upload} from "../middlewares/upload.middleware.js";
import {uploadSingle} from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadSingle);

export default router;