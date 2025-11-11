import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { verifyAdmin } from "../utils/verifyAdmin";
import API from "../api";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const res = await API.get("/album/list");

      setAlbums(res.data?.album || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load albums");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);
  const handleDelete = async (id) => {
    const isVerified = await verifyAdmin();
    if (!isVerified) return;

    try {
      const res = await API.post("/album/remove", { id });
      if (res.data.success) {
        setAlbums((prev) => prev.filter((a) => a._id !== id));
        toast.success("Album deleted successfully");
      } else {
        toast.error(res.data.message || "Failed to delete album");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting album");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      {loading && <Loader />}
      <h2 className="text-2xl font-semibold mb-4">Album List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {albums.length === 0 && (
          <div className="text-slate-500">No albums yet.</div>
        )}
        {albums.map((album) => (
          <div key={album._id} className="border rounded overflow-hidden">
            <div
              className="h-40"
              style={{ backgroundColor: album.bgColor || "#f3f4f6" }}
            >
              {album.image ? (
                <img
                  src={album.image}
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  No image
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="font-bold">{album.name}</div>
              <div className="text-sm text-slate-600">{album.desc}</div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleDelete(album._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
