import { Outlet, useNavigate } from "react-router";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";

export const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (userData) return;
    try {
      const response = await axios.get(`${BASE_URL}/profile`, {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user:", error);
      // Handle the error, e.g., display an error message
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-4 px-4">
        {" "}
        {/* <- NEW: layout container */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
