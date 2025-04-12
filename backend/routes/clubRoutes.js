import express from 'express';
import { createBlog, getClubBlogs, getPendingBlogs, approveBlog } from '../controllers/clubController.js';

const router = express.Router();

// Create a new blog (for club)
router.post('/create-blog', createBlog);

// Get all blogs for the club
router.get('/blogs', getClubBlogs);

// Get pending blogs for approval
router.get('/pending-blogs', getPendingBlogs);

// Approve a specific blog
router.put('/approve-blog/:id', approveBlog);

export default router;
