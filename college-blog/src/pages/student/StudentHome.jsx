import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Bell, Moon, Sun } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const StudentHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [blogs, setBlogs] = useState([
    {
      _id: 1,
      title: "My Interview Experience at Google",
      description: "Sharing my experience and preparation strategy for cracking the Google software engineering interview.",
    },
    {
      _id: 2,
      title: "How I Got Placed at Amazon",
      description: "A complete breakdown of the rounds, questions asked, and tips for Amazon's on-campus placement process.",
    },
    {
      _id: 3,
      title: "Resume Tips for Top Tech Companies",
      description: "Learn how to structure your resume for companies like Microsoft, Adobe, and Atlassian.",
    },
    {
      _id: 4,
      title: "Off-Campus Placement at Atlassian",
      description: "Detailed story of how I secured an offer at Atlassian through off-campus efforts and networking.",
    },
    {
      _id: 5,
      title: "My Journey to a Frontend Role at Zomato",
      description: "Preparation resources and interview questions that helped me crack a frontend developer role at Zomato.",
    },
    {
      _id: 6,
      title: "Placement Preparation for Service-Based Companies",
      description: "Tips and resources to prepare for Wipro, TCS, Infosys, and Cognizant placements.",
    },
    {
      _id: 7,
      title: "Coding Questions Asked in Adobe Interview",
      description: "List of DSA questions and system design topics that appeared in my Adobe interview rounds.",
    },
  ]);
  // Initialize as an empty array, list of all blogs
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [activeSection, setActiveSection] = useState("clubs");
  const [selectedClub, setSelectedClub] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  // const [searchQuery, setSearchQuery] = useState(""); // searchterm is used

  const navigate = useNavigate();

  // Fetching blogs and clubs data
  const fetchData = async () => {
    try {
      const blogsRes = await axios.get("/api/blogs");
      if (Array.isArray(blogsRes.data)) {
        setBlogs(blogsRes.data); // Ensure the response is an array
      } else {
        toast.error("Blogs data is not in the expected format.");
      }

      const clubsRes = await axios.get("/api/clubs");
      if (Array.isArray(clubsRes.data)) {
        setClubs(clubsRes.data); // Ensure clubs data is in array format
      } else {
        toast.error("Clubs data is not in the expected format.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Failed to load blogs or clubs.");
    }
  };

  // Handle liking a blog
  const handleLike = async (blogId) => {
    try {
      await axios.post(`/api/student/like/${blogId}`);
      setLikedBlogs([...likedBlogs, blogId]);
      toast.success("Blog liked!");
    } catch (err) {
      toast.error("Error liking blog.");
    }
  };

  // Handle saving a blog
  const handleSave = async (blogId) => {
    try {
      await axios.post(`/api/student/save/${blogId}`);
      setSavedBlogs([...savedBlogs, blogId]);
      toast.success("Blog saved!");
    } catch (err) {
      toast.error("Error saving blog.");
    }
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  const [acmSubSection, setAcmSubSection] = useState("");

  const toggleAcmSubSection = (section) => {
    setAcmSubSection((prev) => (prev === section ? "" : section));
  };
  //Filter blogs based on search term
  // const filteredBlogs = blogs.filter(
  //   (blog) =>
  //     blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  useEffect(() => {
    fetchData();
  }, []);


  return (

    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <div className={`fixed z-30 md:static top-0 left-0 h-full w-64 ${darkMode ? "bg-gray-800" : "bg-blue-900"} text-white transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Student Panel</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div> { /*change 1*/}
        <nav className="p-4 space-y-4">
          {/* Clubs Section */}

          <div>
            <div
              onClick={() =>
                setActiveSection((prev) => (prev === "clubs" ? "" : "clubs"))
              }
              className={`cursor-pointer px-3 py-2 rounded hover:bg-blue-700 font-bold ${activeSection === "clubs" && "bg-blue-700"
                }`}
            >
              Clubs
            </div>
            {activeSection === "clubs" && (
              <div className="ml-4 mt-2 space-y-1 ">
                {/* ACM Club */}
                <div>
                  <div
                    onClick={() => toggleAcmSubSection("acm")}
                    className={`cursor-pointer px-3 py-2 rounded hover:bg-blue-700 font-bold  ${acmSubSection === "acm" && "bg-blue-700"
                      }`}
                  >
                    ACM
                  </div>
                  {acmSubSection === "acm" && (
                    <div className="ml-4 mt-2 space-y-1">
                      {/* Sub-options under ACM */}
                      <div className="cursor-pointer hover:underline text-xs">
                        Club Members
                      </div>
                      <div className="cursor-pointer hover:underline text-xs">
                        ACM Blogs
                      </div>
                    </div>
                  )}
                </div>
                {/* IvLabs Club */}
                <div>
                  <div
                    onClick={() => toggleAcmSubSection("ivlabs")}
                    className={`cursor-pointer px-3 py-2 rounded hover:bg-blue-700 font-bold ${acmSubSection === "ivlabs" && "bg-blue-700"
                      }`}
                  >
                    IvLabs
                  </div>
                  {acmSubSection === "ivlabs" && (
                    <div className="ml-4 mt-2 space-y-1">
                      {/* Sub-options under IvLabs */}
                      <div className="cursor-pointer hover:underline text-xs">
                        Club Members
                      </div>
                      <div className="cursor-pointer hover:underline text-xs">
                        IvLabs Blogs
                      </div>
                    </div>
                  )}
                </div>

                {/* GDSC Club */}
                <div>
                  <div
                    onClick={() => toggleAcmSubSection("gdsc")}
                    className={`cursor-pointer px-3 py-2 rounded hover:bg-blue-700 font-bold ${acmSubSection === "gdsc" && "bg-blue-700"
                      }`}
                  >
                    GDSC
                  </div>
                  {acmSubSection === "gdsc" && (
                    <div className="ml-4 mt-2 space-y-1">
                      {/* Sub-options under GDSC */}
                      <div className="cursor-pointer hover:underline text-xs">
                        Club Members
                      </div>
                      <div className="cursor-pointer hover:underline text-xs">
                        GDSC Blogs
                      </div>
                    </div>
                  )}
                </div>

                {/* IDS Club */}
                <div>
                  <div
                    onClick={() => toggleAcmSubSection("ids")}
                    className={`cursor-pointer px-3 py-2 rounded hover:bg-blue-700 font-bold ${acmSubSection === "ids" && "bg-blue-700"
                      }`}
                  >
                    IDS
                  </div>
                  {acmSubSection === "ids" && (
                    <div className="ml-4 mt-2 space-y-1">
                      {/* Sub-options under IDS */}
                      <div className="cursor-pointer hover:underline text-xs">
                        Club Members
                      </div>
                      <div className="cursor-pointer hover:underline text-xs">
                        IDS Blogs
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Placements Section*/}
          <div
            onClick={() => setActiveSection("placements")}
            className={`cursor-pointer px-3 py-2 rounded hover:bg-blue-700 font-bold ${activeSection === "placements" && "bg-blue-700"
              }`}
          >
            Intern/Placements
          </div>


          {/* Academic Material Section */}
          <div
            onClick={() => setActiveSection("academics")}
            className={`cursor-pointer px-3 py-2 rounded hover:bg-blue-700 font-bold ${activeSection === "academics" && "bg-blue-700"
              }`}
          >
            Academic Resources
          </div>
          {/* Tech Stack Section (Single Option) */}
          <div
            onClick={() => setActiveSection("techstack")}
            className={`cursor-pointer px-3 py-2 rounded hover:bg-blue-700 font-bold ${activeSection === "techstack" && "bg-blue-700"
              }`}
          >
            Tech Stack
          </div>

          {/* Tech Stack Section (Single Option) */}
          <div
            onClick={() => setActiveSection("blog")}
            className={`cursor-pointer px-3 py-2 rounded hover:bg-blue-700 font-bold ${activeSection === "blog" && "bg-blue-700"
              }`}
          >
            Blogs
          </div>

        </nav>



      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className={`flex justify-between items-center shadow-md px-4 py-4 md:px-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>

          <h2 className="text-xl font-semibold text-blue-700">Welcome Student</h2>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-700 dark:bg-gray-300 rounded-lg px-4 py-2">
              <Search className="text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                className="bg-transparent text-sm ml-2 outline-none w-48"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Notification */}
            {/* <div className="relative">
              <Bell className="cursor-pointer" />
            </div> */}



            {/* User Icon */}
            <div className="relative">
              <img
                src="path_to_user_logo_or_image" // Replace with actual image path or use an icon
                alt="User"
                className="w-8 h-8 rounded-full cursor-pointer border-1 border-gray-400"
              />
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
        <div className="p-6 overflow-y-auto flex-1"> {/*change 2*/}
          {activeSection === "clubs" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Clubs</h2>

              {selectedClub && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
                  <h3 className="text-lg font-semibold mb-2">{selectedClub}</h3>
                  <p>
                    {selectedClub === "ACM" && "ACM focuses on coding competitions, development, and CS theory."}
                    {selectedClub === "IvLabs" && "IvLabs is the robotics and innovation lab at VNIT, focused on hardware and AI."}
                    {selectedClub === "IDS" && "IDS is a design club working on UI/UX, graphics, and visual creativity."}
                    {selectedClub === "GDSC" && "Google Developer Student Club works on real-world projects, learning Google technologies."}
                  </p>
                </div>
              )}

              {!selectedClub && (
                <p>Select a club from the sidebar to see details.</p>
              )}
            </>
          )}


          {activeSection === "placements" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Placements</h2>
              <p>This section will show Intern/Placements stats, related stuff etc.</p>
            </>
          )}

          {activeSection === "academics" && (
            <>
              <h2 className="text-2xl font-bold mb-4"> This section will show academic resources</h2>
              <p>This section will show PDFs, resources, etc.</p>
            </>
          )}

          {/* Displaying filtered blogs */}
          {filteredBlogs.length > 0 && activeSection === "blog" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Blogs</h2>
              {filteredBlogs.map((blog) => (
                <div key={blog.id} className="p-4 bg-white dark:bg-gray-500 rounded shadow mb-4">
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p>{blog.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* If no filtered blogs found */}
          {filteredBlogs.length === 0 && activeSection === "blog" && (
            <p>No blogs found matching your search criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
