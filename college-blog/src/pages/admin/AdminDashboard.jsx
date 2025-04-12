//import React, { useEffect, useState } from "react";
//import { Link, useLocation, useNavigate } from "react-router-dom";
//import {
//  Menu,
//  X,
//  Bell,
//  ChevronDown,
//  ChevronRight,
//  Moon,
//  Sun,
//} from "lucide-react";
//import { toast } from "react-toastify";
//import { motion } from "framer-motion";
//import axios from "axios";

//const AdminHome = () => {
//  const [sidebarOpen, setSidebarOpen] = useState(false);
//  const [darkMode, setDarkMode] = useState(false);
//  const [collapseMenu, setCollapseMenu] = useState(null);
//  const [blogs, setBlogs] = useState([]);
//  const [clubs, setClubs] = useState([]);
//  const [disapprovedCount, setDisapprovedCount] = useState(0);

//  const location = useLocation();
//  const navigate = useNavigate();
//  const tab = new URLSearchParams(location.search).get("tab");

//  const handleLogout = () => {
//    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//    toast.success("Logged out successfully");
//    navigate("/student/login");
//  };

//  const toggleTheme = () => {
//    setDarkMode(!darkMode);
//    document.documentElement.classList.toggle("dark");
//  };

//  const fetchData = async () => {
//    try {
//      if (tab === "pendingBlogs") {
//        const { data } = await axios.get("/api/admin/pending-blogs");
//        setBlogs(data);
//      } else if (tab === "approvedBlogs") {
//        const { data } = await axios.get("/api/admin/approved-blogs");
//        setBlogs(data);
//      } else if (tab === "pendingClubs") {
//        const { data } = await axios.get("/api/admin/pending-clubs");
//        setClubs(data);
//      } else if (tab === "approvedClubs") {
//        const { data } = await axios.get("/api/admin/approved-clubs");
//        setClubs(data);
//      }

//      const { data: disapprovedData } = await axios.get(
//        "/api/admin/disapproved-data"
//      );
//      setDisapprovedCount(
//        (disapprovedData.blogs?.length || 0) +
//          (disapprovedData.clubs?.length || 0)
//      );
//    } catch (err) {
//      toast.error("Failed to load data");
//    }
//  };

//  const handleApprove = async (id, type) => {
//    try {
//      await axios.put(`/api/admin/approve-${type}/${id}`);
//      toast.success(`${type} approved`);
//      fetchData();
//    } catch (err) {
//      toast.error(`Failed to approve ${type}`);
//    }
//  };

//  const handleDelete = async (id, type) => {
//    try {
//      await axios.delete(`/api/admin/delete-${type}/${id}`);
//      toast.success(`${type} deleted`);
//      fetchData();
//    } catch (err) {
//      toast.error(`Failed to delete ${type}`);
//    }
//  };

//  useEffect(() => {
//    fetchData();
//  }, [tab]);

//  const sidebarItems = [
//    {
//      title: "Manage Blogs",
//      subItems: [
//        { name: "Pending Blogs", to: "/admin/dashboard?tab=pendingBlogs" },
//        { name: "Approved Blogs", to: "/admin/dashboard?tab=approvedBlogs" },
//      ],
//    },
//    {
//      title: "Manage Clubs",
//      subItems: [
//        { name: "Pending Clubs", to: "/admin/dashboard?tab=pendingClubs" },
//        { name: "Approved Clubs", to: "/admin/dashboard?tab=approvedClubs" },
//      ],
//    },
//  ];

//  return (
//    <div
//      className={`flex h-screen transition-colors duration-500 ${
//        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
//      }`}
//    >
//      {/* Sidebar */}
//      <div
//        className={`fixed z-30 md:static top-0 left-0 h-full w-64 ${
//          darkMode ? "bg-gray-800" : "bg-blue-900"
//        } text-white transform transition-transform duration-300 ${
//          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//        }`}
//      >
//        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-700">
//          <h1 className="text-xl font-bold">Admin Panel</h1>
//          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
//            <X />
//          </button>
//        </div>

//        <nav className="p-4 space-y-4">
//          {sidebarItems.map((item, i) => (
//            <div key={i}>
//              <div
//                className="flex items-center justify-between cursor-pointer hover:bg-blue-800 px-3 py-2 rounded"
//                onClick={() => setCollapseMenu(collapseMenu === i ? null : i)}
//              >
//                <span>{item.title}</span>
//                {collapseMenu === i ? <ChevronDown /> : <ChevronRight />}
//              </div>
//              {collapseMenu === i && (
//                <motion.div
//                  initial={{ height: 0, opacity: 0 }}
//                  animate={{ height: "auto", opacity: 1 }}
//                  transition={{ duration: 0.3 }}
//                  className="ml-4 mt-1 space-y-2"
//                >
//                  {item.subItems.map((sub, j) => (
//                    <Link
//                      key={j}
//                      to={sub.to}
//                      className="block px-3 py-1 rounded hover:bg-blue-700 text-sm"
//                    >
//                      {sub.name}
//                    </Link>
//                  ))}
//                </motion.div>
//              )}
//            </div>
//          ))}
//        </nav>
//      </div>

//      {/* Main content */}
//      <div className="flex-1 flex flex-col overflow-hidden">
//        {/* Navbar */}
//        <div
//          className={`flex justify-between items-center shadow-md px-4 py-4 md:px-6 ${
//            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
//          }`}
//        >
//          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
//            <Menu />
//          </button>

//          <h2 className="text-xl font-semibold text-blue-700 dark:text-white">
//            WELCOME ADMIN
//          </h2>

//          <div className="flex items-center gap-4">
//            {/* Notification */}
//            <div className="relative">
//              <Bell className="cursor-pointer" />
//              {disapprovedCount > 0 && (
//                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white px-1 rounded-full">
//                  {disapprovedCount}
//                </span>
//              )}
//            </div>

//            {/* Dark mode toggle */}
//            <button onClick={toggleTheme}>
//              {darkMode ? <Sun /> : <Moon />}
//            </button>

//            {/* Logout */}
//            <button
//              onClick={handleLogout}
//              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
//            >
//              Logout
//            </button>
//          </div>
//        </div>

//        {/* Content Section */}
//        <motion.div
//          initial={{ opacity: 0, y: 15 }}
//          animate={{ opacity: 1, y: 0 }}
//          transition={{ duration: 0.4 }}
//          className="p-6 overflow-y-auto flex-1"
//        >
//          {tab?.includes("Blogs") && (
//            <div>
//              <h2 className="text-xl font-bold mb-4 capitalize">{tab}</h2>
//              {blogs.length === 0 ? (
//                <p>No blogs available</p>
//              ) : (
//                blogs.map((blog) => (
//                  <div
//                    key={blog._id}
//                    className="bg-white dark:bg-gray-800 shadow-md p-4 mb-4 rounded-md"
//                  >
//                    <h3 className="font-bold">{blog.title}</h3>
//                    <p className="text-sm text-gray-500">
//                      {blog.description?.slice(0, 100)}...
//                    </p>
//                    <div className="flex gap-2 mt-3">
//                      <Link
//                        to={`/blog/${blog._id}`}
//                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
//                      >
//                        Read
//                      </Link>
//                      {tab === "pendingBlogs" && (
//                        <>
//                          <button
//                            onClick={() => handleApprove(blog._id, "blog")}
//                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
//                          >
//                            Approve
//                          </button>
//                          <button
//                            onClick={() => handleDelete(blog._id, "blog")}
//                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
//                          >
//                            Delete
//                          </button>
//                        </>
//                      )}
//                    </div>
//                  </div>
//                ))
//              )}
//            </div>
//          )}

//          {tab?.includes("Clubs") && (
//            <div>
//              <h2 className="text-xl font-bold mb-4 capitalize">{tab}</h2>
//              {clubs.length === 0 ? (
//                <p>No clubs available</p>
//              ) : (
//                clubs.map((club) => (
//                  <div
//                    key={club._id}
//                    className="bg-white dark:bg-gray-800 shadow-md p-4 mb-4 rounded-md"
//                  >
//                    <h3 className="font-bold">{club.name}</h3>
//                    <p className="text-sm text-gray-500">
//                      {club.description?.slice(0, 100)}...
//                    </p>
//                    <div className="flex gap-2 mt-3">
//                      {tab === "pendingClubs" && (
//                        <>
//                          <button
//                            onClick={() => handleApprove(club._id, "club")}
//                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
//                          >
//                            Approve
//                          </button>
//                          <button
//                            onClick={() => handleDelete(club._id, "club")}
//                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
//                          >
//                            Delete
//                          </button>
//                        </>
//                      )}
//                    </div>
//                  </div>
//                ))
//              )}
//            </div>
//          )}
//        </motion.div>
//      </div>
//    </div>
//  );
//};

//export default AdminHome;
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu, X, Bell, ChevronDown, ChevronRight, Moon, Sun,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [collapseMenu, setCollapseMenu] = useState(null);
  const [disapprovedCount, setDisapprovedCount] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [clubs, setClubs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const tab = new URLSearchParams(location.search).get("tab");

  const handleLogout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    toast.success("Logged out successfully");
    navigate("/student/login");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const fetchData = async () => {
    try {
      if (tab === "pendingBlogs") {
        const res = await axios.get("/api/admin/pending-blogs");
        setBlogs(res.data);
      } else if (tab === "approvedBlogs") {
        const res = await axios.get("/api/admin/approved-blogs");
        setBlogs(res.data);
      } else if (tab === "pendingClubs") {
        const res = await axios.get("/api/admin/pending-clubs");
        setClubs(res.data);
      } else if (tab === "approvedClubs") {
        const res = await axios.get("/api/admin/approved-clubs");
        setClubs(res.data);
      }

      const disapproved = await axios.get("/api/admin/disapproved-data");
      setDisapprovedCount(
        disapproved.data.disapprovedBlogs.length + disapproved.data.disapprovedClubs.length
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id, type) => {
    try {
      await axios.put(`/api/admin/approve-${type}/${id}`);
      toast.success(`${type === "blog" ? "Blog" : "Club"} approved`);
      fetchData();
    } catch (err) {
      toast.error("Error approving");
    }
  };

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`/api/admin/delete-${type}/${id}`);
      toast.success(`${type === "blog" ? "Blog" : "Club"} deleted`);
      fetchData();
    } catch (err) {
      toast.error("Error deleting");
    }
  };

  useEffect(() => {
    fetchData();
  }, [tab]);

  const sidebarItems = [
    {
      title: "Manage Blogs",
      subItems: [
        { name: "Pending Blogs", to: "/admin/dashboard?tab=pendingBlogs" },
        { name: "Approved Blogs", to: "/admin/dashboard?tab=approvedBlogs" },
      ],
    },
    {
      title: "Manage Clubs",
      subItems: [
        { name: "Pending Clubs", to: "/admin/dashboard?tab=pendingClubs" },
        { name: "Approved Clubs", to: "/admin/dashboard?tab=approvedClubs" },
      ],
    },
  ];

  const renderBlogs = () =>
    blogs.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400">No blogs found.</p>
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
            {!blog.isApproved && (
              <>
                <button
                  onClick={() => handleApprove(blog._id, "blog")}
                  className="bg-green-500 px-3 py-1 rounded text-white text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDelete(blog._id, "blog")}
                  className="bg-red-500 px-3 py-1 rounded text-white text-sm"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))
    );

  const renderClubs = () =>
    clubs.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400">No clubs found.</p>
    ) : (
      clubs.map((club) => (
        <div
          key={club._id}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow-md mb-4"
        >
          <h3 className="text-lg font-semibold mb-1">{club.name}</h3>
          <p className="text-sm mb-2">{club.description}</p>
          <div className="flex gap-3">
            {!club.isApproved && (
              <>
                <button
                  onClick={() => handleApprove(club._id, "club")}
                  className="bg-green-500 px-3 py-1 rounded text-white text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDelete(club._id, "club")}
                  className="bg-red-500 px-3 py-1 rounded text-white text-sm"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))
    );

  return (
    <div className={`flex h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <div className={`fixed z-30 md:static top-0 left-0 h-full w-64 ${darkMode ? "bg-gray-800" : "bg-blue-900"} text-white transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
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

          <h2 className="text-xl font-semibold text-blue-700 dark:text-white">WELCOME ADMIN</h2>

          <div className="flex items-center gap-4">
            {/* Notification */}
            <div className="relative">
              <Bell className="cursor-pointer" />
              {disapprovedCount > 0 && (
                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white px-1 rounded-full">
                  {disapprovedCount}
                </span>
              )}
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme}>
              {darkMode ? <Sun /> : <Moon />}
            </button>

            {/* Logout */}
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
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
          {tab?.includes("Blog") ? renderBlogs() : tab?.includes("Club") ? renderClubs() : (
            <p className="text-gray-500 dark:text-gray-400">
              Please select a section from the sidebar.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
