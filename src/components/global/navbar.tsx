import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/phsiotherapy.jpg";
import useAuth from "../../hooks/user-details";
import AppLoader from "../ui/apploader";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNotifications, setOpenNotifications] = useState(false);
  const { user } = useAuth();
  if (!user) return <AppLoader />;
  console.log(user, "user");
  const handleNotificationsClick = () => {
    setOpenNotifications((prev) => !prev);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-gray-800">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-24 h-auto" />
        </Link>
      </div>
      <nav className="hidden md:flex space-x-8">
        <Link
          to="/Physiotherapist-Consultation"
          className="text-white hover:underline"
        >
          Physiotherapist Consultation
        </Link>
        <Link to="/Medicine-store" className="text-white hover:underline">
          Medicine Store
        </Link>
        <Link to="/Exercises" className="text-white hover:underline">
          Exercises
        </Link>
        <Link to="/Pose-detection" className="text-white hover:underline">
          Pose Detection
        </Link>
        <Link to="/News" className="text-white hover:underline">
          News
        </Link>
        <Link to="/FeedbackReporting" className="text-white hover:underline">
          About Us
        </Link>
      </nav>
      <div className="flex items-center">
        <>
          <button className="relative" onClick={handleNotificationsClick}>
            {/* <span className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-red-500"></span>
            <svg
              className="w-6 h-6 text-white hover:opacity-75 transition-opacity"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 17h-6c-1.1 0-2-.9-2-2v-5c0-2.21 1.79-4 4-4h2c2.21 0 4 1.79 4 4v5c0 1.1-.9 2-2 2zm-3-20c-1.1 0-2 .9-2 2v1H6c-1.1 0-2 .9-2 2v4c0 2.21 1.79 4 4 4h2c2.21 0 4-1.79 4-4V2c0-1.1-.9-2-2-2h-1z"
                fill="currentColor"
              />
            </svg> */}
            {/* {openNotifications && (
                <div className="absolute right-0 z-50 w-80 p-4 mt-2 bg-white rounded shadow-lg">
                  <div className="flex items-center">
                    <p className="ml-2">
                      <strong>{user.name}, you have logged in</strong>
                    </p>
                  </div>
                </div>
              )} */}
          </button>
          <div className="relative">
            <button onClick={handleMenuClick} className="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            </button>
            {/* {anchorEl && (
                <div className="absolute right-0 z-50 w-40 p-2 mt-2 bg-white rounded shadow-lg">
                  <p className="py-2 px-4">{user.name}</p>
                  <button className="flex items-center py-2 px-4 text-red-600 hover:bg-gray-100 w-full text-left">
                    Logout
                  </button>
                </div>
              )} */}
          </div>
        </>
      </div>
    </header>
  );
}
