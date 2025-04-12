import React, { useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Blog submitted! (simulate backend)");
    console.log({ title, description, image, file });

    setTitle("");
    setDescription("");
    setImage(null);
    setFile(null);
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
      <h2 className="text-2xl font-semibold text-center text-blue-700 dark:text-white mb-6">
        Add a New Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Blog Title */}
        <div className="relative">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400 transition"
          />
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
            <span className="text-sm text-gray-400 dark:text-gray-500">Title</span>
          </div>
        </div>

        {/* Description */}
        <div className="relative">
          <textarea
            placeholder="Blog Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400 transition"
            rows="6"
          />
          <div className="absolute top-3 right-3">
            <span className="text-sm text-gray-400 dark:text-gray-500">Description</span>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-blue-100 file:text-blue-700
              hover:file:bg-blue-200 transition"
          />
        </div>

        {/* PDF/Word Upload */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Upload Document (PDF/Word)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-blue-100 file:text-blue-700
              hover:file:bg-blue-200 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
