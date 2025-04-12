import Student from '../models/student.js';
import Blog from '../models/Blog.js';
import cloudinary from 'cloudinary';

// 🟢 Update Profile
export const updateProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id);

    const { name, password } = req.body;

    if (name) student.name = name;
    if (password) student.password = password;

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'studentProfiles',
      });
      student.profilePic = result.secure_url;
    }

    await student.save();
    res.status(200).json({ message: 'Profile updated successfully', student });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err });
  }
};

// 🟢 Logout Student
export const logoutStudent = (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logged out successfully' });
};

// 🟢 Get Blogs by Section
export const getBlogsBySection = async (req, res) => {
  const { section } = req.params;
  try {
    const blogs = await Blog.find({ section:section, approved: true, });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err });
  }
};

// 🟢 Like a blog
export const likeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const student = await Student.findById(req.student._id);

  if (!blog.likes.includes(req.student._id)) {
    blog.likes.push(req.student._id);
    student.likedBlogs.push(blog._id);
    await blog.save();
    await student.save();
  }

  res.status(200).json({ message: 'Blog liked' });
};

// 🟢 Unlike a blog
export const unlikeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const student = await Student.findById(req.student._id);

  blog.likes = blog.likes.filter((id) => id.toString() !== req.student._id.toString());
  student.likedBlogs = student.likedBlogs.filter((id) => id.toString() !== blog._id.toString());

  await blog.save();
  await student.save();

  res.status(200).json({ message: 'Blog unliked' });
};

// 🟢 Save a blog
export const saveBlog = async (req, res) => {
  const student = await Student.findById(req.student._id);
  if (!student.savedBlogs.includes(req.params.id)) {
    student.savedBlogs.push(req.params.id);
    await student.save();
  }
  res.status(200).json({ message: 'Blog saved' });
};

// 🟢 Unsave a blog
export const unsaveBlog = async (req, res) => {
  const student = await Student.findById(req.student._id);
  student.savedBlogs = student.savedBlogs.filter((id) => id.toString() !== req.params.id);
  await student.save();
  res.status(200).json({ message: 'Blog unsaved' });
};

// 🟢 Get Liked Blogs
export const getLikedBlogs = async (req, res) => {
  const student = await Student.findById(req.student._id).populate('likedBlogs');
  res.status(200).json(student.likedBlogs);
};

// 🟢 Get Saved Blogs
export const getSavedBlogs = async (req, res) => {
  const student = await Student.findById(req.student._id).populate('savedBlogs');
  res.status(200).json(student.savedBlogs);
};
