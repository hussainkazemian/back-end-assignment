import express from 'express';
import { resetPassword } from '../controllers/password-reset-controller.js';

const router = express.Router();

// Define the password reset endpoint
router.post('/:token', resetPassword);

export default router;
