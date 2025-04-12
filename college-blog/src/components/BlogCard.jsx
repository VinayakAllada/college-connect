import React from "react";
import { Heart, Share2 } from "lucide-react";
// mini blog card
const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={blog.coverImage}
        alt="cover"
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {blog.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span>{blog.likes.length}</span>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center gap-1 hover:text-blue-500"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
