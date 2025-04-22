import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
export const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            🧑‍💻 devTinder
          </Link>
        </div>
        <div className="flex gap-2">
          <Link
            to={"/connections"}
            className="text-white text-lg font-medium cursor-pointer hover:text-blue-400 transition m-1"
          >
            Connections
          </Link>
          <Link
            to={"/requests"}
            className="text-white text-lg font-medium cursor-pointer hover:text-blue-400 transition m-1"
          >
            requests
          </Link>

          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="flex items-center">
            {user && <p>Welcome, {user.firstName}</p>}
          </div>
          <div className="dropdown dropdown-end mx-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user && (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handlelogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
