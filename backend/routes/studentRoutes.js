import express from 'express';
import {

  logoutStudent,
  getAllApprovedClubs,
  getClubBlogs,
  getBlogsBySection,
  updateStudentProfile,
  getLikedBlogs,
  getStudentInfo,
  likeOrUnlikeBlog,
  commentOnBlog
  
} from '../controllers/studentContoller.js';

import { protectStudent } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const router = express.Router();
router.get('/clubs', protectStudent, getAllApprovedClubs);
router.get('/clubs/:clubId/blogs', protectStudent, getClubBlogs);
router.get('/blogs/section/:section', protectStudent, getBlogsBySection);
router.put('/update-profile', protectStudent, upload.single('profilePic'), updateStudentProfile);
router.get('/liked-blogs', protectStudent, getLikedBlogs);
router.get('/me', protectStudent, getStudentInfo);
router.post('/like/:blogId', protectStudent, likeOrUnlikeBlog);
router.post('/comment/:blogId', protectStudent, commentOnBlog);

export default router;
