import React from "react";
import { Menu, LogOut, User } from "lucide-react";
import {jwtDecode} from "jwt-decode";

const Navbar = ({ toggleSidebar }) => {
  // 🔑 Get token from localStorage (or sessionStorage)
  const token = localStorage.getItem("token");

  // Default user
  let user = { username: "Guest", role: "N/A" };

  if (token) {
    try {
      const decoded = jwtDecode(token);
      // assuming your backend puts email/username in `sub` and role in `role`
      user = {
        username: decoded.sub || "Unknown",
        role: decoded.role || "USER",
      };
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login
  };

  return (
    <nav className="bg-blue-600 px-6 py-4 text-white flex justify-between items-center shadow-md">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded hover:bg-blue-700 transition"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      {/* Right side */}
      {user && (
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <User size={18} />
            Welcome, {user.username} ({user.role})
          </span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
