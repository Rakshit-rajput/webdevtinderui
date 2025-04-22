import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [image, setImage] = useState(user?.image || "");
  const dispatch = useDispatch();
  const handleUpdate = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, about, image },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));

      console.log("Profile updated:", res.data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleUpdate}>
        <p className="title">Update Profile</p>
        <p className="message">Update your information below.</p>

        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span>Firstname</span>
          </label>
          <label>
            <input
              className="input"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input
            className="input"
            type="text"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <span>image</span>
        </label>
        <label>
          <input
            className="input"
            type="number"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <span>Age</span>
        </label>

        <label>
          <input
            className="input"
            type="text"
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <span>About</span>
        </label>

        <label>
          <input
            className="input"
            type="text"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <span>Gender</span>
        </label>

        <button className="submit" type="submit">
          Submit
        </button>
      </form>
      <FeedCard user={{ firstName, lastName, age, gender, about }} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  padding: 40px;
  flex-wrap: wrap;

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
    flex-shrink: 0;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #00bfff;
  }

  .title::before,
  .title::after {
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: #00bfff;
    position: absolute;
    left: 0px;
  }

  .title::after {
    animation: pulse 1s linear infinite;
  }

  .message {
    font-size: 14.5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .flex {
    display: flex;
    gap: 6px;
  }

  .form label {
    position: relative;
    width: 100%;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 20px 5px 5px 10px;
    border: 1px solid rgba(105, 105, 105, 0.4);
    border-radius: 10px;
    outline: none;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    transition: 0.3s ease;
    pointer-events: none;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #00bfff;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .submit {
    padding: 10px;
    border-radius: 10px;
    font-size: 16px;
    border: none;
    background-color: #00bfff;
    color: #fff;
    transition: 0.3s ease;
    cursor: pointer;
  }

  .submit:hover {
    background-color: #00bfff96;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default EditProfile;
