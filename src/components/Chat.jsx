import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const user = useSelector((state) => state.user);
  const { _id: userId, firstName } = user;
  const { toUserId } = useParams();

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch existing chat messages
  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/chat/${toUserId}`, {
        withCredentials: true,
      });

      const chatMessages = response?.data?.messages?.map((msg) => ({
        id: msg._id,
        senderId: msg.senderId,
        text: msg.text,
      }));

      setMessages(chatMessages || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchChatMessages();
  }, [toUserId]);

  // Initialize socket connection
  useEffect(() => {
    if (!userId || !toUserId) return;

    const newSocket = createSocketConnection();

    newSocket.emit("joinChat", {
      firstName,
      userId,
      toUserId,
    });

    newSocket.on("messageRev", ({ senderId, text }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(), // fallback in absence of backend ID
          senderId,
          text,
        },
      ]);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [userId, toUserId]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    const messagePayload = {
      firstName,
      userId,
      toUserId,
      text: newMessage,
    };

    socket.emit("sendMessage", messagePayload);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        senderId: userId,
        text: newMessage,
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName}`}
                <time className="text-xs opacity-50"> 2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
