import express from 'express';
import { addComment } from '../controllers/commentController.js';
import { protectClub, protectStudent } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add/student', protectStudent, addComment);
router.post('/add/club', protectClub, addComment);

export default router;
