import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailId, setEmailId] = useState("rak2@gmail.com");
  const [password, setPassword] = useState("##PassC@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res);
      dispatch(addUser(res.data));
      return Navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.log(error);
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/signUp",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(addUser(res.data.user));
      return Navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.log(error);
    }
  };
  return (
    <>
      <main class="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
        <section class="flex w-[30rem] flex-col space-y-10">
          {!isSignUp && (
            <div class="text-center text-4xl font-medium">Log In</div>
          )}

          {isSignUp && (
            <>
              <div class="text-center text-4xl font-medium">Sign Up</div>
              <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                <input
                  type="text"
                  placeholder="First Name"
                  class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                <input
                  type="text"
                  placeholder="Last Name"
                  class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder="Email or Username"
              class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              placeholder="Password"
              class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-600">{error}</p>
          {!isSignUp && (
            <button
              class="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
              onClick={handleLogin}
            >
              LOG IN
            </button>
          )}
          {isSignUp && (
            <button
              class="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          )}

          <a
            href="#"
            class="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
          >
            FORGOT PASSWORD?
          </a>
          {!isSignUp && (
            <p class="text-center text-lg">
              No account?
              <a
                href="#"
                class="font-medium text-indigo-500 underline-offset-4 hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                Create One
              </a>
            </p>
          )}
          {isSignUp && (
            <p class="text-center text-lg">
              Already signedUp?
              <a
                href="#"
                class="font-medium text-indigo-500 underline-offset-4 hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                Sign In
              </a>
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default Login;
