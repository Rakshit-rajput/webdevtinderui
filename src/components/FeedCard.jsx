import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removefeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";

const FeedCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(user);
  if (!user) return null;

  const {
    firstName,
    lastName,
    age,
    gender,
    about,
    skills = [],
    _id,
    image,
  } = user;
  // console.log("log for image" + image);
  const handleInterested = async () => {
    await axios.post(
      `${BASE_URL}/request/interested/${_id}`,
      {},
      { withCredentials: true }
    );
    dispatch(removefeed(_id));
  };
  const handleIgnore = async () => {
    try {
      await axios.post(
        `${BASE_URL}/request/ignored/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removefeed(_id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card w-96 bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <figure>
        <img
          // src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600"
          src={image}
          alt="Profile"
          className="object-cover w-full h-48"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-semibold">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-600 mb-2">{about}</p>
        <p className="text-sm font-medium text-gray-500">{`${gender}, ${age} years old`}</p>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-secondary" onClick={handleInterested}>
            Interested
          </button>
          <button className="btn btn-outline" onClick={handleIgnore}>
            Ignore
          </button>
          <button
            onClick={() => navigate(`/viewprofile/${_id}`)}
            className="btn btn-outline"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
