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
    pdfs: [String],    // URLs to uploaded PDFs (Cloudinary or local)
    photos: [String],  // URLs to uploaded images
    authorType: {
      type: String,
      enum: ["Student", "Club"],
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      default: null,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin approves all blogs
    },
    commentIds: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    }, 
   
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
