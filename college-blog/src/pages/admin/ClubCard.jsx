import React from "react";
import { Link } from "react-router-dom";

const ClubCard = ({ club }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 mb-4 rounded shadow-lg">
      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
        <Link to={`/admin/club/${club._id}`}>{club.name}</Link>
      </h3>
      <p className="text-gray-500 dark:text-gray-400">{club.description}</p>
      <div className="flex justify-between mt-3">
        <span className="text-sm text-gray-500">Created by: {club.createdBy}</span>
        <span className="text-sm text-gray-500">Date: {new Date(club.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ClubCard;
