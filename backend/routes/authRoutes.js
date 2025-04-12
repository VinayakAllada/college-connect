import express from 'express';
import {
  registerStudent,
  loginStudent,
  registerClub,
  loginClub,
} from '../controllers/authController.js';
import jwt from 'jsonwebtoken'
import upload from "../middlewares/multer.js";
const router = express.Router();

import Club from '../models/Club.js';
// Student & Admin
import Student from '../models/student.js';
router.post('/student/register',upload.single("profilepic"),registerStudent);
router.post('/student/login', loginStudent);
router.get('/check-auth', async (req, res) => {
  try {
   
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'No token found' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if student
    const student = await Student.findById(decoded.id);
    if (student) return res.json({ userType: 'student' });
    
    // Check if club
    const club = await Club.findById(decoded.id);
    if (club) return res.json({ userType: 'club' });

    // Check if admin
    if (
      decoded.email === process.env.ADMIN_EMAIL &&
      decoded.role === 'admin'
    ) {
      return res.json({ userType: 'admin' });
    }

    return res.status(401).json({ message: 'Invalid token user' });
  } catch (err) {
    
    return res.status(401).json({ message: 'Auth failed', error: err.message });
  }
});

// Club

router.post('/club/login', loginClub);
router.post("/club/register", upload.single("photo"), registerClub);
export default router;
