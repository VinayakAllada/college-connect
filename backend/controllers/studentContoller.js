import Student from '../models/student.js';
import Blog from '../models/Blog.js';
import cloudinary from 'cloudinary';
import Club from '../models/Club.js'


// 🟢 Logout Student
export const logoutStudent = (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logged out successfully' });
};

// 1. Get all approved clubs
export const getAllApprovedClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ isApproved: true });
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch clubs' });
  }
};

// 2. Get all blogs of a particular club
export const getClubBlogs = async (req, res) => {
  try {
    const { clubId } = req.params;
    const blogs = await Blog.find({ clubId, status: 'approved' });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch club blogs' });
  }
};

// 3. Get blogs based on section
export const getBlogsBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const blogs = await Blog.find({ section, status: 'approved' });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch section blogs' });
  }
};

// 4. Update profile (name or photo)
export const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id);

    if (!student) return res.status(404).json({ message: 'Student not found' });

    const { name } = req.body;

    if (name) student.name = name;

    if (req.file) {
      // Delete old image if exists
      if (student.profilePic) {
        const publicId = student.profilePic.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`collegeBlogs/${publicId}`);
      }
      student.profilePic = req.file.path;
    }
 
    await student.save();
    res.status(200).json({ message: 'Profile updated', student });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// 5. Get liked blogs
export const getLikedBlogs = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id).populate({
      path: 'likedBlogs',
      match: { status: 'approved' },
    });
    res.status(200).json(student.likedBlogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch liked blogs' });
  }
};

// 6. Get student info
export const getStudentInfo = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id).select('-password');
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student info' });
  }
};
// 7. Like or Unlike a blog
export const likeOrUnlikeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const likedIndex = blog.likes.indexOf(req.student._id);

    if (likedIndex === -1) {
      blog.likes.push(req.student._id);  // Like
      await blog.save();
      res.status(200).json({ message: 'Blog liked' });
    } else {
      blog.likes.splice(likedIndex, 1);  // Unlike
      await blog.save();
      res.status(200).json({ message: 'Blog unliked' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error liking/unliking blog' });
  }
};

// 8. Comment on a blog
export const commentOnBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.comments.push({
      student: req.student._id,
      comment
    });

    await blog.save();
    res.status(200).json({ message: 'Comment added' });
  } catch (error) {
    res.status(500).json({ message: 'Error commenting on blog' });
  }
};
