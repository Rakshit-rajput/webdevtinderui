import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router";

function GetMail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null); // Changed to store file object
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Debug step changes
  useEffect(() => {
    console.log("Current step:", step);
  }, [step]);

  const validateSignUpData = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setError(
        "Password must be at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      );
      return false;
    }
    return true;
  };

  const sendOtp = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/otpgenerate`,
        { email },
        { withCredentials: true }
      );
      console.log("OTP sent:", res.data);
      setStep(2);
      console.log("Step set to 2");
    } catch (error) {
      const errorMessage = error?.response?.data || "Error sending OTP";
      setError(errorMessage);
      console.error("Error in sendOtp:", errorMessage, error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log("OTP verified:", res.data);
      setStep(3);
      console.log("Step set to 3");
    } catch (error) {
      const errorMessage = error?.response?.data || "Invalid OTP";
      setError(errorMessage);
      console.error("Error in verifyOtp:", errorMessage, error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async () => {
    if (!validateSignUpData()) return;
    setIsLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("emailId", email);
      formData.append("password", password);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(`${BASE_URL}/auth/signUp`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Sign up successful:", res.data);
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.slice(7) || "Sign up failed";
      setError(errorMessage);
      console.error("Error in signUp:", errorMessage, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {error && (
        <p className="text-red-500 mb-4 font-semibold bg-red-100 p-3 rounded">
          {error}
        </p>
      )}

      {step === 1 ? (
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 text-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={sendOtp}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 disabled:bg-blue-300 transition"
            disabled={isLoading}
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      ) : step === 2 ? (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border border-gray-300 text-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isLoading}
          />
          <button
            onClick={verifyOtp}
            className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 disabled:bg-green-300 transition"
            disabled={isLoading}
          >
            {isLoading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 text-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 text-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 text-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 text-black p-3 w-full rounded"
            disabled={isLoading}
          />
          <button
            onClick={signUp}
            className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700 disabled:bg-purple-300 transition"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </div>
      )}
    </div>
  );
}

export default GetMail;
