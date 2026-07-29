import express from "express";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();
app.use(express.json());
app.use('/', uploadRoutes);

export default app;