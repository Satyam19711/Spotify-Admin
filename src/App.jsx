import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddAlbum from "./pages/AddAlbum";
import AlbumList from "./pages/AlbumList";
import AddSong from "./pages/AddSong";
import SongList from "./pages/SongList";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/albums" replace />} />
          <Route path="/add-album" element={<AddAlbum />} />
          <Route path="/albums" element={<AlbumList />} />
          <Route path="/add-song" element={<AddSong />} />
          <Route path="/songs" element={<SongList />} />
        </Routes>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default App;
