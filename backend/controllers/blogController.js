import Blog from '../models/Blog.js';
import Student from '../models/student.js';

export const createBlog = async (req, res) => {
  try {
    const { title, description, section } = req.body;
    const files = req.files;

    const media = files.map((file) => file.path);

    let author, authorType;
    if (req.student) {
      author = req.student._id;
      authorType = 'Student';
    } else if (req.club) {
      author = req.club._id;
      authorType = 'Club';
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const blog = await Blog.create({
      title,
      description,
      section,
      media,
      author,
      authorType,
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create blog', error: err });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ approved: true })
      .populate('author')
      .populate('comments');
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
};

export const getSectionBlogs = async (req, res) => {
  const section = req.params.section;
  try {
    const blogs = await Blog.find({ section, approved: true });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching section blogs' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author').populate('comments');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (String(blog.author) !== String(req.club._id)) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await blog.deleteOne();
    res.status(200).json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog' });
  }
};

export const editBlog = async (req, res) => {
  try {
    const { title, description, section } = req.body;
    const files = req.files;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (String(blog.author) !== String(req.club._id)) {
      return res.status(403).json({ message: 'Not authorized to edit this blog' });
    }

    const media = files.length ? files.map((f) => f.path) : blog.media;

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.section = section || blog.section;
    blog.media = media;

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error editing blog' });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const studentId = req.student._id;
    const index = blog.likes.indexOf(studentId);

    if (index > -1) {
      blog.likes.splice(index, 1); // Unlike
    } else {
      blog.likes.push(studentId); // Like
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error liking blog' });
  }
};

export const saveBlog = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id);
    const blogId = req.params.id;

    const index = student.savedBlogs.indexOf(blogId);

    if (index > -1) {
      student.savedBlogs.splice(index, 1); // Unsave
    } else {
      student.savedBlogs.push(blogId); // Save
    }

    await student.save();
    res.status(200).json(student.savedBlogs);
  } catch (err) {
    res.status(500).json({ message: 'Error saving blog' });
  }
};
