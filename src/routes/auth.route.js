import express from 'express';
import { createUser, loginUser, getUsers, getUserById, updateUser, deleteUser, checkLoginStatus } from '../controllers/auth.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get("/status", checkLoginStatus);

router.get('/users', getUsers);
router.get('/users/:id', auth(['admin']), getUserById);
router.put('/users/:id', auth(['admin']), updateUser);
router.delete('/users/:id', auth(['admin']), deleteUser);

export default router;