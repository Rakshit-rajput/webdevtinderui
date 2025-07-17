import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validatePassword = () => {
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
  const handlelogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const resetPassword = async () => {
    if (!validatePassword()) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/auth/resetPassword`,
        { email, otp, password },
        { withCredentials: true }
      );
      console.log("Password reset successful:", res.data);
      //   navigate("/login"); // Redirect to login page
      handlelogout();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.slice(7) || "Error resetting password";
      setError(errorMessage);
      console.error("Error in resetPassword:", errorMessage, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current step:", step);
  }, [step]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {error && (
        <p className="text-red-500 mb-4 font-semibold bg-red-100 p-3 rounded">
          {error}
        </p>
      )}
      {step === 1 && (
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
      )}
      {step === 2 && (
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
      )}
      {step === 3 && (
        <div className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 text-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            onClick={resetPassword}
            className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700 disabled:bg-purple-300 transition"
            disabled={isLoading}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
