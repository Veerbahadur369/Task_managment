import  {Router} from 'express';
import { createTask, getAllTasks, getAllUsers, updateTaskStatus } from '../controllers/admin.controllers.mjs';
import authMiddleware from '../middlewares/auth.middleware.mjs';
import roleMiddleware from '../middlewares/role.middleware.mjs';
import { ADMIN_ROLE } from '../constants.mjs';

const adminRoute = Router();

// - Admin should be able to view all users.
adminRoute.get('/allusers',authMiddleware,roleMiddleware(ADMIN_ROLE),getAllUsers);
// - Admin should be able to create tasks.
adminRoute.post('/createtask',authMiddleware,roleMiddleware(ADMIN_ROLE),createTask);
// - Admin should be able to view all tasks.
adminRoute.get('/alltasks',authMiddleware,roleMiddleware(ADMIN_ROLE),getAllTasks);
  
// - Admin must define a status for each task.
adminRoute.patch('/updatetaskstatus/:id',authMiddleware,roleMiddleware(ADMIN_ROLE),updateTaskStatus);

export {adminRoute}; 