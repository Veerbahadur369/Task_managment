
import { Router } from "express";
import { downloadUserDocument, uploadUserDocument, userDocuments } from "../controllers/documnets.controllers.mjs";
import authMiddleware from "../middlewares/auth.middleware.mjs";
import { upload } from "../config/multer.mjs";
 

const documentsRoute = Router();

documentsRoute.post('/upload',authMiddleware,upload.single('file'),uploadUserDocument);
documentsRoute.get('/user-documents',authMiddleware,userDocuments);
documentsRoute.get('/download/:id',authMiddleware,downloadUserDocument);

export { documentsRoute };