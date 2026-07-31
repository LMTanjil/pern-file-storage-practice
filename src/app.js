import express from "express";
import uploadRoutes from "./routes/files.routes.js";

const app = express();
app.use(express.json());
app.use('/files', uploadRoutes);

export default app;