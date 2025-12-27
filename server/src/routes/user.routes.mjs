
import { Router } from "express";
import { getUserProfile, userLogin,  userRegister, userTasks } from "../controllers/user.controllers.mjs";
import authMiddleware from "../middlewares/auth.middleware.mjs";
import roleMiddleware from "../middlewares/role.middleware.mjs";
import { userDocuments } from "../controllers/documnets.controllers.mjs";
 

const userRoute = Router();
 
userRoute.post('/register',userRegister);
userRoute.post('/login',userLogin);
 userRoute.get('/profile',authMiddleware,getUserProfile);
 userRoute.get('/tasks',authMiddleware , userTasks);
 userRoute.get('/documents',authMiddleware, userDocuments);
userRoute.get('/test',authMiddleware,roleMiddleware("user") ,(req, res) => {
  res.send('User route is working');
});
 


export { userRoute };