import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 mb-4 rounded shadow-lg">
      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
        <Link to={`/admin/blog/${blog._id}`}>{blog.title}</Link>
      </h3>
      <p className="text-gray-500 dark:text-gray-400">{blog.description}</p>
      <div className="flex justify-between mt-3">
        <span className="text-sm text-gray-500">Author: {blog.author}</span>
        <span className="text-sm text-gray-500">Date: {new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default BlogCard;
