import express from 'express';
import upload from '../middlewares/multer.js';
import {
  createBlog,
  getAllBlogs,
  getSectionBlogs,
  getBlogById,
  deleteBlog,

  likeBlog,
  saveBlog,
} from '../controllers/blogController.js';

import { protectStudent, protectClub } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create Blog - For both Student and Club
router.post(
  '/create',
  upload.array('files', 10),
  (req, res, next) => {
    // Decide whether student or club based on header
    if (req.headers.usertype === 'student') return protectStudent(req, res, next);
    if (req.headers.usertype === 'club') return protectClub(req, res, next);
    return res.status(401).json({ message: 'Invalid user type' });
  },
  createBlog
);

// Get All Approved Blogs
router.get('/', getAllBlogs);

// Get Blogs by Section
router.get('/section/:section', getSectionBlogs);

// Get Blog by ID
router.get('/:id', getBlogById);

// Edit Blog
router.put('/:id', protectClub, upload.array('files', 10), editBlog);

// Delete Blog
router.delete('/:id', protectClub, deleteBlog);

// Like Blog
router.put('/like/:id', protectStudent, likeBlog);

// Save Blog
router.put('/save/:id', protectStudent, saveBlog);

export default router;
