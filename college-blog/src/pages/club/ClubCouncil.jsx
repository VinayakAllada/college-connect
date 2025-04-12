import React, { useState } from "react";

const initialCouncil = [
  { role: "President", name: "Ybisky", image: "/images/ybisky.jpg" },
  { role: "Vice President", name: "Aarav", image: "/images/aarav.jpg" },
  { role: "Event Head", name: "Mira", image: "/images/mira.jpg" },
  { role: "Tech Lead", name: "Nikhil", image: "/images/nikhil.jpg" },
];

const ClubCouncil = () => {
  const [council, setCouncil] = useState(initialCouncil);
  const [newRole, setNewRole] = useState("");
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);

  const handleNameChange = (index) => {
    const newName = prompt("Enter new name:");
    if (newName && newName.trim() !== "") {
      const updatedCouncil = [...council];
      updatedCouncil[index].name = newName.trim();
      setCouncil(updatedCouncil);
    }
  };

  const handleRoleChange = (index) => {
    const newRole = prompt("Enter new role:");
    if (newRole && newRole.trim() !== "") {
      const updatedCouncil = [...council];
      updatedCouncil[index].role = newRole.trim();
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

  const handleAddMember = () => {
    if (!newRole || !newName || !newImage) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const newMember = {
      role: newRole,
      name: newName,
      image: URL.createObjectURL(newImage),
    };

    setCouncil([...council, newMember]);
    setNewRole("");
    setNewName("");
    setNewImage(null);
    document.getElementById("newImageInput").value = "";
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-6">
  Meet our Dynamic Council!
</h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
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

            <input
              id={`fileInput-${i}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(i, e.target.files[0])}
              className="hidden"
            />
            <button
  onClick={() => handleRoleChange(i)}
  className="w-full py-2 mb-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
>
  Change Role
</button>

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

      {/* Add New Member Section */}
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Add New Member</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Role (e.g., Design Head)"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          <div className="flex items-center space-x-4">
  <input
    type="file"
    id="newImageInput"
    accept="image/*"
    onChange={(e) => setNewImage(e.target.files[0])}
    className="hidden"
  />
  <button
    type="button"
    onClick={() => document.getElementById("newImageInput").click()}
    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
  >
    Choose Photo
  </button>
  <span className="text-sm text-gray-700 dark:text-gray-300">
    {newImage ? newImage.name : "No file chosen"}
  </span>
</div>

          <button
            onClick={handleAddMember}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubCouncil;
