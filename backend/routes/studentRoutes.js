import express from 'express';
import {
  updateProfile,
  logoutStudent,
  getBlogsBySection,
  likeBlog,
  unlikeBlog,
  saveBlog,
  unsaveBlog,
  getLikedBlogs,
  getSavedBlogs,
} from '../controllers/studentContoller.js';

import { protectStudent } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

// Protected routes
router.put('/update', protectStudent, upload.single('profilePic'), updateProfile);
router.get('/logout', protectStudent, logoutStudent);

router.get('/blogs/:section', protectStudent, getBlogsBySection);

router.put('/like/:id', protectStudent, likeBlog);
router.put('/unlike/:id', protectStudent, unlikeBlog);

router.put('/save/:id', protectStudent, saveBlog);
router.put('/unsave/:id', protectStudent, unsaveBlog);

router.get('/liked', protectStudent, getLikedBlogs);
router.get('/saved', protectStudent, getSavedBlogs);

export default router;
