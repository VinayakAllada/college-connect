import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 mb-4 rounded shadow-lg">
      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
        <Link to={`/club/blog/${blog._id}`}>{blog.title}</Link>
      </h3>
      <p className="text-gray-500 dark:text-gray-400">{blog.description.substring(0, 100)}...</p>
      <div className="flex justify-between mt-3">
        <span className="text-sm text-gray-500">Section: {blog.section}</span>
        <span className="text-sm text-gray-500">Status: {blog.isApproved ? 'Approved' : 'Pending'}</span>
      </div>
    </div>
  );
};

export default BlogCard;
