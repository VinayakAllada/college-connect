import Club from "../models/Club.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";

// 🔁 Update Club Profile (desc, password, optional photo)
export const updateClubProfile = async (req, res) => {
  const clubId = req.club._id;
  const { description, password } = req.body;
  let clubPhoto = req.body.clubPhoto;

  try {
    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found" });

    if (description) club.description = description;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      club.password = await bcrypt.hash(password, salt);
    }

    // Optional photo upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      clubPhoto = result.secure_url;
      club.clubPhoto = clubPhoto;
    }

    await club.save();
    res.status(200).json({ message: "Club profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update club profile", error: err });
  }
};

// 👀 View all blogs created by the club
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ club: req.club._id }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching club blogs", error: err });
  }
};

// 💬 Add Comment on Blog
export const commentOnBlog = async (req, res) => {
  const { blogId } = req.params;
  const { text } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = new Comment({
      blog: blogId,
      text,
      postedByClub: req.club._id,
    });

    await comment.save();
    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    res.status(500).json({ message: "Error adding comment", error: err });
  }
};



// Controller to create a new blog (for club)
export const createBlog = async (req, res) => {
  const { title, description, media, section, authorType } = req.body;
  try {
    const newBlog = new Blog({
      title,
      description,
      media,
      section,
      authorType,
      author: req.user.id, // Assuming the club is logged in with JWT
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create blog' });
  }
};

// Controller to fetch blogs for the club (including approved and pending blogs)
export const getClubBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }); // Only fetch blogs for the current club
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};

// Controller to get pending blogs (where approval is false)
export const getPendingBlogs = async (req, res) => {
  try {
    const pendingBlogs = await Blog.find({ author: req.user.id, isApproved: false }); // Only pending blogs for the club
    res.status(200).json(pendingBlogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending blogs' });
  }
};

// Controller to approve a blog (admin or club)
export const approveBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.isApproved = true; // Mark as approved
    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve blog' });
  }
};
