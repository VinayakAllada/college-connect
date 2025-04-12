import React, { useState } from "react";

const ViewClub = () => {
  const [logo, setLogo] = useState("/images/acm-logo.png"); // Default logo path

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoUrl = URL.createObjectURL(file);
      setLogo(logoUrl);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">ACM Coding Club</h2>

      {/* Centered Club Logo Section */}
      <div className="mb-6 flex flex-col items-center">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Club Logo:</p>
        <img
          src={logo}
          alt="Club Logo"
          className="w-28 h-28 object-contain border-2 border-gray-300 dark:border-gray-600 rounded mb-3"
        />
        <input
          id="logoInput"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="hidden"
        />
        <button
          onClick={() => document.getElementById("logoInput").click()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Upload New Logo
        </button>
      </div>

      {/* Club Description */}
      <p className="text-gray-700 dark:text-gray-300 text-center">
        The ACM Club promotes coding culture on campus with regular contests, mentorship programs, and tech workshops.
        We actively participate in ICPC, Codeforces, and LeetCode contests.
      </p>
    </div>
  );
};

export default ViewClub;
