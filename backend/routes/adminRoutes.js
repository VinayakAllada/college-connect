
import express from 'express';

import { isAdmin } from '../middlewares/authMiddleware.js';

import {
  getPendingClubs,
  approveClub,
  rejectClub,
  getPendingBlogs,
  approveBlog,
  rejectBlog,
} from "../controllers/adminController.js";
const router = express.Router();
// Middleware: Student must be admin
// CLUB ROUTES
router.get('/pending-clubs', isAdmin, getPendingClubs);
router.put('/approve-club/:clubId', isAdmin, approveClub);
router.put('/reject-club/:clubId', isAdmin, rejectClub);

// BLOG ROUTES
router.get('/pending-blogs', isAdmin, getPendingBlogs);
router.put('/approve-blog/:blogId', isAdmin, approveBlog);
router.put('/reject-blog/:blogId', isAdmin, rejectBlog);

export default router;
