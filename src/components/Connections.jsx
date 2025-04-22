import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/connections`, {
        withCredentials: true,
      });
      const { message } = res.data;
      setConnections(message);
      dispatch(addConnections(message));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  return (
    <>
      <div className="flex flex-wrap gap-4 m-4 justify-center">
        {connections.map((connection) => {
          return <ConnectionCard connection={connection} />;
        })}
      </div>
    </>
  );
};

export default Connections;
