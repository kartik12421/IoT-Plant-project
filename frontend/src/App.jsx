import { Routes, Route, NavLink } from "react-router-dom";
import { Leaf, Mic } from "lucide-react";
import Dash from "./pages/Dash";
import Ai from "./pages/Ai";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-700 font-semibold text-lg">
            <Leaf size={20} />
            GreenPulse
          </div>
          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/ai"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`
              }
            >
              <Mic size={14} />
              Voice
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dash />} />
        <Route path="/ai" element={<Ai />} />
      </Routes>
    </div>
  );
}
