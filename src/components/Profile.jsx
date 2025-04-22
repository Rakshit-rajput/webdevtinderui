import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import EditProfile from "./EditProfile";
const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  if (!user) {
    navigate("/login");
  }
  return (
    <>
      <div className="flex justify-center items-center">
        <EditProfile />
      </div>
    </>
  );
};

export default Profile;
