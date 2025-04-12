import jwt from 'jsonwebtoken';
import Student from '../models/student.js';
import Club from '../models/Club.js';

export const protectStudent = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id).select('-password');

    if (!student) return res.status(401).json({ message: 'Not authorized' });

    req.student = student;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

export const protectClub = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const club = await Club.findById(decoded.id).select('-password');

    if (!club) return res.status(401).json({ message: 'Not authorized' });

    req.club = club;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

//export const protectAdmin = (req, res, next) => {
//  try {
//    const token = req.cookies.token;
//    if (!token) return res.status(401).json({ message: 'Not authorized' });

//    const decoded = jwt.verify(token, process.env.JWT_SECRET);
//    if (
//      decoded.email === process.env.ADMIN_EMAIL &&
//      decoded.role === 'admin'
//    ) {
//      req.admin = true;
//      next();
//    } else {
//      return res.status(401).json({ message: 'Not authorized as admin' });
//    }
//  } catch (err) {
//    return res.status(401).json({ message: 'Token invalid' });
//  }
//};
export const isAdmin = (req, res, next) => {
  if (req.student && req.student.email === process.env.ADMIN_EMAIL) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};