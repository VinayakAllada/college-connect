

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
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
    content: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
