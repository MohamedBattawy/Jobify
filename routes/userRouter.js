import { Router } from 'express';
import { authorizePermissions, checkForTestUser } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
const router = Router();

import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
    authorizePermissions('admin'),
    getApplicationStats,
  ]);
router.patch('/update-user',checkForTestUser , upload.single('avatar'), validateUpdateUserInput, updateUser);
export default router;