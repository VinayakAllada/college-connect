import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Bell, ChevronDown, ChevronRight, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const ClubDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [collapseMenu, setCollapseMenu] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [club, setClub] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const tab = new URLSearchParams(location.search).get("tab");

  // Fetching data for blogs, pending blogs, and club info
  const fetchData = async () => {
    try {
      const clubRes = await axios.get("/api/club/details");
      setClub(clubRes.data);

      if (tab === "clubBlogs") {
        const res = await axios.get(`/api/club/${clubRes.data._id}/blogs`);
        setBlogs(res.data);
      } else if (tab === "pendingBlogs") {
        const res = await axios.get(`/api/club/${clubRes.data._id}/pending-blogs`);
        setPendingBlogs(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle uploading a blog
  const handleUploadBlog = async (blogData) => {
    try {
      await axios.post(`/api/club/${club._id}/upload-blog`, blogData);
      toast.success("Blog uploaded successfully!");
      fetchData();
    } catch (err) {
      toast.error("Error uploading blog");
    }
  };

  // Handle approving a blog
  const handleApproveBlog = async (blogId) => {
    try {
      await axios.put(`/api/club/approve-blog/${blogId}`);
      toast.success("Blog approved!");
      fetchData();
    } catch (err) {
      toast.error("Error approving blog");
    }
  };

  // Handle deleting a blog
  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`/api/club/delete-blog/${blogId}`);
      toast.success("Blog deleted");
      fetchData();
    } catch (err) {
      toast.error("Error deleting blog");
    }
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    fetchData();
  }, [tab]);

  const sidebarItems = [
    {
      title: "Manage Blogs",
      subItems: [
        { name: "My Blogs", to: "/club/dashboard?tab=clubBlogs" },
        { name: "Pending Blogs", to: "/club/dashboard?tab=pendingBlogs" },
      ],
    },
    {
      title: "Club Info",
      subItems: [
        { name: "Edit Club", to: "/club/edit" },
        { name: "View Club", to: "/club/view" },
      ],
    },
  ];

  const renderBlogs = () =>
    blogs.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400">No blogs found for this club.</p>
    ) : (
      blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow-md mb-4"
        >
          <h3 className="text-lg font-semibold mb-1">{blog.title}</h3>
          <p className="text-sm mb-2">{blog.description}</p>
          <div className="flex gap-3">
            <Link
              to={`/blog/${blog._id}`}
              className="bg-blue-500 px-3 py-1 rounded text-white text-sm"
            >
              Read
            </Link>
            <button
              onClick={() => handleDeleteBlog(blog._id)}
              className="bg-red-500 px-3 py-1 rounded text-white text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    );

  const renderPendingBlogs = () =>
    pendingBlogs.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400">No pending blogs to approve.</p>
    ) : (
      pendingBlogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow-md mb-4"
        >
          <h3 className="text-lg font-semibold mb-1">{blog.title}</h3>
          <p className="text-sm mb-2">{blog.description}</p>
          <div className="flex gap-3">
            <button
              onClick={() => handleApproveBlog(blog._id)}
              className="bg-green-500 px-3 py-1 rounded text-white text-sm"
            >
              Approve
            </button>
            <button
              onClick={() => handleDeleteBlog(blog._id)}
              className="bg-red-500 px-3 py-1 rounded text-white text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    );

  return (
    <div className={`flex h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <div className={`fixed z-30 md:static top-0 left-0 h-full w-64 ${darkMode ? "bg-gray-800" : "bg-blue-900"} text-white transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Club Panel</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="p-4 space-y-4">
          {sidebarItems.map((item, i) => (
            <div key={i}>
              <div
                className="flex items-center justify-between cursor-pointer hover:bg-blue-800 px-3 py-2 rounded"
                onClick={() => setCollapseMenu(collapseMenu === i ? null : i)}
              >
                <span>{item.title}</span>
                {collapseMenu === i ? <ChevronDown /> : <ChevronRight />}
              </div>
              {collapseMenu === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 mt-1 space-y-2"
                >
                  {item.subItems.map((sub, j) => (
                    <Link
                      key={j}
                      to={sub.to}
                      className="block px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className={`flex justify-between items-center shadow-md px-4 py-4 md:px-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>

          <h2 className="text-xl font-semibold text-blue-700 dark:text-white">WELCOME CLUB</h2>

          <div className="flex items-center gap-4">
            {/* Notification */}
            <div className="relative">
              <Bell className="cursor-pointer" />
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme}>
              {darkMode ? <Sun /> : <Moon />}
            </button>

            {/* Logout */}
            <button onClick={() => navigate("/student/login")} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
              Logout
            </button>
          </div>
        </div>

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 overflow-y-auto flex-1"
        >
          <h2 className="text-2xl font-bold mb-4 capitalize">
            {tab?.replace(/([A-Z])/g, " $1") || "Dashboard"}
          </h2>
          {tab === "pendingBlogs" ? renderPendingBlogs() : renderBlogs()}
        </motion.div>
      </div>
    </div>
  );
};

export default ClubDashboard;
