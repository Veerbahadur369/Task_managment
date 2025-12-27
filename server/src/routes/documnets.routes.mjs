
import { Router } from "express";
import { uploadUserDocument } from "../controllers/documnets.controllers.mjs";
import authMiddleware from "../middlewares/auth.middleware.mjs";
import { upload } from "../config/multer.mjs";
 

const documentsRoute = Router();

documentsRoute.post('/upload',authMiddleware,upload.single('file'),uploadUserDocument);

export { documentsRoute };