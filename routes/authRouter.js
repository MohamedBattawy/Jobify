import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from '../middleware/validationMiddleware.js';
const router = Router();


router.route('/register')
.post(validateRegisterInput,register);

router.route('/login')
  .post(validateLoginInput,login);

router.get('/logout', logout);

export default router;