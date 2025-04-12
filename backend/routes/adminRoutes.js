
import express from 'express';

import { protectStudent, isAdmin } from '../middlewares/authMiddleware.js';

import {
  approveBlog,
  approveClub,
  getPendingBlogs,
  getPendingClubs,
  deleteClub,
  deleteBlog,
  getApprovedBlogs,
  getApprovedClubs,
  getDisapprovedData
} from "../controllers/adminController.js";
const router = express.Router();
// Middleware: Student must be admin
router.use(protectStudent, isAdmin);
router.put("/approve-blog/:id", approveBlog);
router.put("/approve-club/:id", approveClub);

router.get("/pending-blogs", getPendingBlogs);
router.get("/pending-clubs", getPendingClubs);

router.delete("/delete-club/:id", deleteClub);
router.delete("/delete-blog/:id", deleteBlog);

router.get("/approved-blogs", getApprovedBlogs);
router.get("/approved-clubs", getApprovedClubs);
router.get('/disapproved-data', getDisapprovedData);

export default router;