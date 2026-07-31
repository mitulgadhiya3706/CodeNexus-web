import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { Code2, Sparkles, Users, Inbox, Crown, User, UserPlus, LogOut } from "lucide-react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="navbar bg-base-300 shadow-md px-6 border-b border-gray-700">
        <div className="flex-1">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-wide"
          >
            <Code2 size={28} className="text-blue-500" />
            <span>CodeNexus</span>
          </NavLink>
        </div>

        {user &&
          <div className="flex items-center gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${isActive
                  ? "bg-blue-500/30 backdrop-blur-md text-white"
                  : "text-gray-300 hover:bg-base-200 hover:text-white"
                }`
              }
            >
              <Sparkles size={16} />
              For You
            </NavLink>
            <NavLink
              to="/connections"
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${isActive
                  ? "bg-blue-500/30 backdrop-blur-md text-white"
                  : "text-gray-300 hover:bg-base-200 hover:text-white"
                }`
              }
            >
              <Users size={18} />
              Connections
            </NavLink>
            <NavLink
              to="/requests"
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${isActive
                  ? "bg-blue-500/30 backdrop-blur-md text-white"
                  : "text-gray-300 hover:bg-base-200 hover:text-white"
                }`
              }
            >
              <UserPlus size={16} />
              Requests
            </NavLink>
            <NavLink
              to="/premium"
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${isActive
                  ? "bg-amber-400/30 text-amber-300 border border-amber-500/20"
                  : "text-amber-300"
                }`
              }
            >
              <Crown size={16} />
              Premium
            </NavLink>
          </div>}


        {user && (
          <div className="flex gap-0">
            <p className="flex items-center font-semibold ml-17">
              Welcome, {user.firstName}
            </p>
            <div className="dropdown dropdown-end mx-3 ">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="user photo"
                    src={user.photoUrl}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://api.dicebear.com/7.x/initials/svg?seed=" + user.firstName[0];
                    }}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <NavLink to="/profile">
                    <User size={15} />
                    Profile
                    <span className="badge">New</span>
                  </NavLink>
                </li>
                <li>
                  <a onClick={handleLogout}>
                    <LogOut size={15} />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>)}
      </div>
    </>
  )
}

export default NavBar;
