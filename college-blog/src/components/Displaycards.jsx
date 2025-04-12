import React from "react";
import BlogCard from "./BlogCard";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const TestBlogCards = () => {
  const dummyBlogs = [
    {
      _id: "1",
      title: "The Power of React + Tailwind CSS",
      coverImage: img1,
      likes: [1, 2, 3, 4],
    },
    {
      _id: "2",
      title: "Mastering MERN Stack in 2025",
      coverImage: img2,
      likes: [1],
    },
    {
      _id: "3",
      title: "Deploying to Vercel & Render Easily",
      coverImage: img3,
      likes: [],
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Mini Blog Cards (Test)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default TestBlogCards;
