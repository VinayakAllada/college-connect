import Club from "../models/Club.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";

import { deleteImage } from '../utils/cloudinary.js';

export const logoutclub = (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logged out successfully' });
};


export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    if(!title|| !description)
      {
        return res.status(400).json({ message: ' Complete details are  missing ' });
      }

    const coverimg = req.files['coverimg']?.[0]?.path || null;
    const photos = req.files['photos']?.map((file) => file.path) || [];
    const pdfs = req.files['pdfs']?.map((file) => file.path) || [];
    if (!coverimg) {
      return res.status(400).json({ message: 'Cover image is required' });
    }
   

    const newBlog = await Blog.create({
      title,
      description,
      coverimg,
      photos,
      pdfs,
     
      authorType: 'Club',
      clubId: req.club._id,
      section: 'Club',
      status: 'approved', // club blogs are auto-approved
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog: newBlog,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog',
      error: error.message,
    });
  }
};
// Controller to fetch blogs for the club 

export const getClubBlogs = async (req, res) => {
  try {
    const clubId = req.club._id;

    const blogs = await Blog.find({ clubId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error('Error fetching club blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch club blogs',
      error: error.message,
    });
  }
};
export const updateClubDescription = async (req, res) => {
  try {
    const { description } = req.body;
    req.club.description = description || req.club.description;
    await req.club.save();
    res.json({ message: 'Description updated successfully', club: req.club });
  } catch (error) {
    res.status(500).json({ message: 'Error updating description' });
  }
};
// 2. Update Profile Photo
export const updateClubProfilePhoto = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No image uploaded' });

    // Delete old photo if exists
    if (req.club.photo) {
      await deleteImage(req.club.photo);
    }

    req.club.photo = file.path;
    await req.club.save();
    res.json({ message: 'Profile photo updated', photo: file.path });
  } catch (error) {
    res.status(500).json({ message: 'Error updating photo' });
  }
};
// 3. Add Council Member
export const addCouncilMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    const file = req.file;

    if (!name || !role || !file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    req.club.clubCouncil.push({
      name,
      role,
      profilepic: file.path,
    });

    await req.club.save();
    res.json({ message: 'Council member added successfully', clubCouncil: req.club.clubCouncil });
  } catch (error) {
    res.status(500).json({ message: 'Error adding council member' });
  }
};

// 4. Update Existing Council Member (based on id )
export const updateCouncilMember = async (req, res) => {
  try {
    const { memberId, name } = req.body;
    const file = req.file;

    const member = req.club.clubCouncil.id(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Council member not found' });
    }

    if (name) member.name = name;

    if (file) {
      if (member.profilepic) await deleteImage(member.profilepic);
      member.profilepic = file.path;
    }

    await req.club.save();
    res.json({ message: 'Council member updated', member });
  } catch (error) {
    res.status(500).json({ message: 'Error updating council member' });
  }
};

// 5. Change Password
export const changeClubPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(currentPassword, req.club.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    req.club.password = hashed;

    await req.club.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password' });
  }
};
export const deleteCouncilMember = async (req, res) => {
  try {
    const { memberId } = req.body;

    const member = req.club.clubCouncil.id(memberId);
    if (!member) return res.status(404).json({ message: 'Council member not found' });

    if (member.profilepic) await deleteImage(member.profilepic);

    member.deleteOne(); // remove the subdocument
    await req.club.save();

    res.json({ message: 'Council member deleted', clubCouncil: req.club.clubCouncil });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting council member' });
  }
};
export const getClubInfo = async (req, res) => {
  try {
    const clubId = req.club._id;

    const club = await Club.findById(clubId).select('-password');

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.status(200).json(club);
  } catch (error) {
    console.error('Error fetching club info:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
