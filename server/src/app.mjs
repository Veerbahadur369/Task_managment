import express from 'express';
import dotenv from 'dotenv';
import { userRoute } from './routes/user.routes.mjs';
import { adminRoute } from './routes/admin.routes.mjs';
import { documentsRoute } from './routes/documnets.routes.mjs';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cors({ 
    origin: '*',
})); 
app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);   
app.use('/api/documents', documentsRoute);


 
export {app};