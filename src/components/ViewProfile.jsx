import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Updated import
import { BASE_URL } from "../utils/constants";

function ViewProfile() {
  const { userId } = useParams(); // Destructure userId from route params
  const [user, setUser] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State to store errors
  const [loading, setLoading] = useState(true); // State for loading status

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getuserprofile/${userId}`, {
        withCredentials: true, // Correct config option
      });
      console.log(response.data);
      setUser(response.data); // Store user data in state
      setLoading(false); // Update loading state
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]); // Include userId in dependency array to refetch if it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-2xl bg-base-100 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          User Profile
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <div className="flex-1 space-y-4">
            <p className="text-lg text-white">
              <strong className="font-semibold">Name:</strong>{" "}
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : "N/A"}
            </p>
            <p className="text-lg text-white">
              <strong className="font-semibold">Email:</strong>{" "}
              {user.emailId || "N/A"}
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={user.image || "https://via.placeholder.com/150"}
              alt="User profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
