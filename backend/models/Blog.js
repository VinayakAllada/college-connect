import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    media: [String], // For image/pdf URLs
    section: {
      type: String, // 'Intern', 'Tech', 'Academic', or club name
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    authorType: {
      type: String,
      enum: ['student', 'club'],
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'authorType',
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
