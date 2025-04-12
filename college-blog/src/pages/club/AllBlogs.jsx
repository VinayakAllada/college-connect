import React from "react";

const AllBlogs = () => {
  const dummyBlogs = [
    { title: "ACM Club Wins Hackathon", description: "Our club secured 1st place in IIT Bombay Hackathon." },
    { title: "CyberSec Seminar Recap", description: "An overview of the amazing cyber security workshop." },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-blue-700 dark:text-white mb-8">
        All Club Blogs
      </h2>
      {dummyBlogs.map((blog, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{blog.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{blog.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AllBlogs;
