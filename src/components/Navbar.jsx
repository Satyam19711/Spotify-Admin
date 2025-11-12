import React from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded transition-all ${
    isActive ? "bg-slate-700 text-white" : "text-slate-700 hover:bg-slate-100"
  }`;

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex items-center justify-between">
      <div className="text-xl font-bold text-slate-800">Spotify Admin</div>

      <div className="flex gap-2">
        <NavLink to="/add-album" className={linkClass}>
          Add Album
        </NavLink>
        <NavLink to="/albums" className={linkClass}>
          Album List
        </NavLink>
        <NavLink to="/add-song" className={linkClass}>
          Add Song
        </NavLink>
        <NavLink to="/songs" className={linkClass}>
          Song List
        </NavLink>
      </div>

      <div>
        <a
          href="https://satyamspotifyclone.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
        >
          Spotify App
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
