import React, { useState } from "react";

const initialCouncil = [
  { role: "President", name: "Ybisky", image: "/images/ybisky.jpg" },
  { role: "Vice President", name: "Aarav", image: "/images/aarav.jpg" },
  { role: "Event Head", name: "Mira", image: "/images/mira.jpg" },
  { role: "Tech Lead", name: "Nikhil", image: "/images/nikhil.jpg" },
];

const ClubCouncil = () => {
  const [council, setCouncil] = useState(initialCouncil);

  const handleNameChange = (index) => {
    const newName = prompt("Enter new name:");
    if (newName && newName.trim() !== "") {
      const updatedCouncil = [...council];
      updatedCouncil[index].name = newName.trim();
      setCouncil(updatedCouncil);
    }
  };

  const handleImageChange = (index, file) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const updatedCouncil = [...council];
    updatedCouncil[index].image = imageUrl;
    setCouncil(updatedCouncil);
  };

  const triggerFileInput = (index) => {
    document.getElementById(`fileInput-${index}`).click();
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Club Council</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {council.map((member, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-center hover:scale-105 transform transition duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-gray-200 dark:border-gray-600 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{member.role}</p>

            {/* Hidden file input */}
            <input
              id={`fileInput-${i}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(i, e.target.files[0])}
              className="hidden"
            />

            <button
              onClick={() => handleNameChange(i)}
              className="w-full py-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Change Name
            </button>
            <button
              onClick={() => triggerFileInput(i)}
              className="w-full py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Upload New Photo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubCouncil;
