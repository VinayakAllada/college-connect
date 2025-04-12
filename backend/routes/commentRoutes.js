import express from 'express';
import { addComment , getcomments } from '../controllers/commentController.js';
import { protectClub, protectStudent } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add/student', protectStudent, addComment);
router.post('/add/club', protectClub, addComment);
router.get('/get-all-comments/:id',getcomments);

export default router;
