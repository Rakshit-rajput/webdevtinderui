import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const getRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      console.log(res.data);
      dispatch(addRequests(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 m-4 justify-center">
      {requests.length > 0 ? (
        requests.map((connection) => (
          <RequestCard key={connection._id} connection={connection} />
        ))
      ) : (
        <p className="text-center w-full">No requests found.</p>
      )}
    </div>
  );
};

export default Requests;
