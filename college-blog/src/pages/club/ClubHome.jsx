// src/pages/ClubHome.jsx
import React, { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import AddBlog from "./AddBlog";
import AllBlogs from "./AllBlogs";
import ViewClub from "./ViewClub";
import ClubCouncil from "./ClubCouncil";

const ClubHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapseMenu, setCollapseMenu] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const tab = new URLSearchParams(location.search).get("tab") || "allBlogs";

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const sidebarItems = [
    {
      title: "Manage Blogs",
      subItems: [
        { name: "Add Blog", to: "/club/home?tab=addBlog" },
        { name: "All Blogs", to: "/club/home?tab=allBlogs" },
      ],
    },
    {
      title: "Club Info",
      subItems: [
        { name: "View Club", to: "/club/home?tab=viewClub" },
        { name: "Club Council", to: "/club/home?tab=clubCouncil" },
      ],
    },
  ];

  const renderTabContent = () => {
    switch (tab) {
      case "addBlog":
        return <AddBlog />;
      case "viewClub":
        return <ViewClub />;
      case "editClub":
        return <EditClub />;
      case "clubCouncil":
        return <ClubCouncil />;
      default:
        return <AllBlogs />;
    }
  };

  return (
    <div
      className={`flex h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      {/* Sidebar */}
      <div
        className={`fixed z-30 md:static top-0 left-0 h-full w-64 ${darkMode ? "bg-gray-800" : "bg-blue-900"} text-white transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
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
                    <button
                      key={j}
                      onClick={() => navigate(sub.to)}
                      className="block text-left w-full px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      {sub.name}
                    </button>
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
        <div
          className={`flex justify-between items-center shadow-md px-4 py-4 md:px-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        >
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>

          <h2 className="text-xl font-semibold text-blue-700 dark:text-white">
            WELCOME ACM
          </h2>

          <div className="flex items-center gap-4">
            {/* Club Logo */}
            <img src="./images/club-logo.png" alt="club logo" className="w-6 h-6" />

            <button onClick={toggleTheme}>{darkMode ? <Sun /> : <Moon />}</button>

            <button
              onClick={() => navigate("/student/login")}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            >
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
            {tab.replace(/([A-Z])/g, " $1")}
          </h2>
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default ClubHome;
