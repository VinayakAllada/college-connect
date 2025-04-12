import Blog from '../models/Blog.js';
import Club from '../models/Club.js';

export const approveBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.approved = true;
    await blog.save();
    res.status(200).json({ message: 'Blog approved' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving blog' });
  }
};

export const approveClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    club.approved = true;
    await club.save();
    res.status(200).json({ message: 'Club approved' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving club' });
  }
};

export const getPendingBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ approved: false });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pending blogs' });
  }
};

export const getPendingClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ approved: false });
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pending clubs' });
  }
};
// DELETE /api/admin/delete-club/:id
export const deleteClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.status(200).json({ message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting club" });
  }
};
// DELETE /api/admin/delete-blog/:id
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting blog" });
  }
};
// GET /api/admin/approved-blogs
export const getApprovedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isApproved: true }).populate("author", "name");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching blogs" });
  }
};
// GET /api/admin/approved-clubs
export const getApprovedClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ isApproved: true });
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching clubs" });
  }
};
export const getDisapprovedData = async (req, res) => {
  try {
    const disapprovedBlogs = await Blog.find({ status: 'rejected' }).sort({ updatedAt: -1 }).limit(5);
    const disapprovedClubs = await Club.find({ status: 'rejected' }).sort({ updatedAt: -1 }).limit(5);

    res.status(200).json({ disapprovedBlogs, disapprovedClubs });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

