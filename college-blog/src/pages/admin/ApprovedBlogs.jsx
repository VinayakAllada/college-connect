import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";  // A component for displaying individual blog details.

const ApprovedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchApprovedBlogs = async () => {
      try {
        const res = await axios.get("/api/admin/approved-blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch approved blogs", err);
      }
    };

    fetchApprovedBlogs();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Approved Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-500">No Blogs</p>
      ) : (
        blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
      )}
    </div>
  );
};

export default ApprovedBlogs;
