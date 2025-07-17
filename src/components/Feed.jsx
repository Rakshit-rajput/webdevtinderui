import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
const Feed = () => {
  const [feedUsers, setFeedUsers] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  // console.log(user);
  if (!user) {
    navigate("/login");
  }
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      console.log(res.data.data);
      setFeedUsers(res.data.data);

      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 px-4 py-6">
        {feedUsers.map((user) => (
          <FeedCard key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

export default Feed;
