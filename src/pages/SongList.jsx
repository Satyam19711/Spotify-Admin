import React, { useEffect, useState, useRef } from "react";
import API from "../api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { verifyAdmin } from "../utils/verifyAdmin";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/song/list");
      setSongs(res.data?.songs || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load songs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleDelete = async (id) => {
    const isVerified = await verifyAdmin();
    if (!isVerified) return;

    try {
      const res = await API.post("/song/remove", { id });
      if (res.data.success) {
        setSongs((prev) => prev.filter((s) => s._id !== id));
        toast.success("Song deleted successfully");
      } else {
        toast.error(res.data.message || "Failed to delete song");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting song");
    }
  };

  const handlePlayPause = (song) => {
    if (currentSong && currentSong._id === song._id) {
      audioRef.current.pause();
      setCurrentSong(null);
    } else {
      setCurrentSong(song);
    }
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.file;
      audioRef.current.play();
    }
  }, [currentSong]);

  return (
    <div className="bg-white p-6 rounded shadow">
      {loading && <Loader />}
      <h2 className="text-2xl font-semibold mb-4">Song List</h2>

      <div className="space-y-4">
        {songs.length === 0 && (
          <div className="text-slate-500">No songs yet.</div>
        )}
        {songs.map((song) => (
          <div
            key={song._id}
            className="flex items-center gap-4 border p-3 rounded hover:bg-slate-50 transition"
          >
            <img
              src={song.image}
              alt={song.name}
              className="h-16 w-16 object-cover rounded"
            />
            <div className="flex-1">
              <div className="font-bold">{song.name}</div>
              <div className="text-sm text-slate-600">{song.desc}</div>
              <div className="text-xs text-slate-500">Album: {song.album}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePlayPause(song)}
                className="px-3 py-1 bg-slate-700 text-white rounded cursor-pointer hover:bg-slate-800 transition"
              >
                {currentSong && currentSong._id === song._id ? "Pause" : "Play"}
              </button>
              <button
                onClick={() => handleDelete(song._id)}
                className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <audio ref={audioRef} controls className="w-full mt-4" />
    </div>
  );
};

export default SongList;
