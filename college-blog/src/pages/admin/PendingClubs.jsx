import React, { useState, useEffect } from "react";
import axios from "axios";
import ClubCard from "./ClubCard";  // A component for displaying individual club details.

const PendingClubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchPendingClubs = async () => {
      try {
        const res = await axios.get("/api/admin/pending-clubs");
        setClubs(res.data);
      } catch (err) {
        console.error("Failed to fetch pending clubs", err);
      }
    };

    fetchPendingClubs();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Pending Clubs</h2>
      {clubs.length === 0 ? (
        <p className="text-gray-500">No Clubs</p>
      ) : (
        clubs.map((club) => <ClubCard key={club._id} club={club} />)
      )}
    </div>
  );
};

export default PendingClubs;
