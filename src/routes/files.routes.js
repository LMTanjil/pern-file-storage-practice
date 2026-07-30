import express from 'express';
import {upload} from "../middlewares/files.middleware.js";
import {uploadSingle} from "../controllers/files.controller.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadSingle);
router.get"/image",

export default router;