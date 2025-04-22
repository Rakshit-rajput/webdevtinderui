import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequests } from "../utils/requestSlice";

const RequestCard = ({ connection }) => {
  const dispatch = useDispatch();
  console.log(connection);
  const { _id, firstName, lastName, about } = connection.fromUserId;
  //   const { requestId } = connection;
  console.log(connection._id);
  const handleAccept = async () => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/accepted/${connection._id}`,
        {},
        { withCredentials: true }
      );
      // optionally trigger a UI update here
      dispatch(removeRequests(connection._id));
      console.log("Accepted");
    } catch (err) {
      console.log("Accept failed:", err);
    }
  };

  const handleIgnore = async () => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/rejected/${connection._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(connection._id));
      console.log("Ignored");
    } catch (err) {
      console.log("Ignore failed:", err);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-md m-4">
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p className="text-sm text-gray-400">{about}</p>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-success btn-sm" onClick={handleAccept}>
            Accept
          </button>
          <button className="btn btn-error btn-sm" onClick={handleIgnore}>
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
