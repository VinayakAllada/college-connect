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
    urls :[string]
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
     section: {
      type: String,
      enum: ["Intern", "Academic Resources", "Tech Stacks", "Experience", "Club"],
      required: true,
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
    commentIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    }], 
   
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
