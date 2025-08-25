import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  Shield,
  Lock,
  FileText,
} from "lucide-react";
import {jwtDecode} from "jwt-decode";

const Sidebar = ({ isOpen }) => {
  // 🔑 Get token
  const token = localStorage.getItem("token");

  let user = { username: "Guest", role: "GUEST" };

  if (token) {
  try {
    const decoded = jwtDecode(token);
    user = {
      username: decoded.sub || "Unknown",
      role: decoded.authorities?.[0]?.authority.replace("ROLE_", "") || "USER"
    };
    console.log("Decoded user:", user); // 🔍 debug log
  } catch (err) {
    console.error("Invalid token:", err);
  }
}

  // role checker
  const hasRole = (roles) => user && roles.includes(user.role);

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-100 shadow-lg transform transition-transform duration-300 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      <div className="px-6 py-4 text-lg font-semibold border-b border-gray-700">
        Admin Panel
      </div>
      <ul className="space-y-2 p-4">
        <li>
          <Link
            to="/"
            className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
        </li>

        {hasRole(["PRODUCT_MANAGER", "ECOMMERCE_MANAGER", "SYSTEM_ADMIN"]) && (
          <>
            <li>
              <Link
                to="/products"
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
              >
                <Package size={18} /> Products
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
              >
                <Layers size={18} /> Categories
              </Link>
            </li>
            <li>
              <Link
                to="/inventory"
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
              >
                <ClipboardList size={18} /> Inventory
              </Link>
            </li>
          </>
        )}

        {hasRole(["ORDER_MANAGER", "ECOMMERCE_MANAGER", "SYSTEM_ADMIN"]) && (
          <li>
            <Link
              to="/orders"
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
            >
              <ClipboardList size={18} /> Orders
            </Link>
          </li>
        )}

        {hasRole(["ORDER_MANAGER", "CUSTOMER_SERVICE", "ECOMMERCE_MANAGER", "SYSTEM_ADMIN"]) && (
          <li>
            <Link
              to="/customers"
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
            >
              <Users size={18} /> Customers
            </Link>
          </li>
        )}

        {hasRole(["PRODUCT_MANAGER"]) && (
          <li>
            <Link
              to="/analytics/product"
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
            >
              <BarChart3 size={18} /> Product Analytics
            </Link>
          </li>
        )}

        {hasRole(["ORDER_MANAGER"]) && (
          <li>
            <Link
              to="/analytics"
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
            >
              <BarChart3 size={18} /> Order Analytics
            </Link>
          </li>
        )}

        {hasRole(["ECOMMERCE_MANAGER", "SYSTEM_ADMIN"]) && (
          <li>
            <Link
              to="/analytics"
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
            >
              <BarChart3 size={18} /> Analytics
            </Link>
          </li>
        )}

       
      </ul>
    </aside>
  );
};

export default Sidebar;