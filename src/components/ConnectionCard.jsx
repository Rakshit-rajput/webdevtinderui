import React from "react";

const ConnectionCard = ({ connection }) => {
  const { firstName, lastName, about } = connection;
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src="https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Profile"
            className="rounded-xl object-cover w-full h-40"
          />
        </figure>

        <div className="card-body items-center text-center">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{about}</p>
          <div className="card-actions">
            <button className="btn btn-primary">Chat now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionCard;
