import express from "express";
import { imageUpload } from "../controller/imageUploadController.js";

const router = express.Router();

router.post("/", imageUpload);

export default router;
