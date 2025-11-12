import React, { useEffect, useRef, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { verifyAdmin } from "../utils/verifyAdmin";

const AddSong = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("");
  const [albums, setAlbums] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageInputRef = useRef();
  const audioInputRef = useRef();

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const res = await API.get("/album/list");
        setAlbums(res.data?.album || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load albums");
      }
    };
    loadAlbums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isVerified = await verifyAdmin();
    if (!isVerified) return;

    if (!name || !album || !audioFile) {
      toast.error("Name, album, and audio file are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("album", album);
    formData.append("image", imageFile);
    formData.append("audio", audioFile);

    try {
      setLoading(true);
      const res = await API.post("/song/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("🎵 Song added successfully!");
      console.log("Response:", res.data);

      setName("");
      setDesc("");
      setAlbum("");
      setImageFile(null);
      setAudioFile(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
      if (audioInputRef.current) audioInputRef.current.value = "";
    } catch (err) {
      console.error("Error adding song:", err.response?.data || err.message);
      toast.error("Failed to add song — check backend logs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      {loading && <Loader />}
      <h2 className="text-2xl font-semibold mb-4">Add Song</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
            placeholder="Enter song name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
            placeholder="Write something about this song..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Album</label>
          <select
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
          >
            <option value="">Select album</option>
            {Array.isArray(albums) &&
              albums.map((a) => (
                <option key={a._id} value={a.name}>
                  {a.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-1"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              ref={audioInputRef}
              onChange={(e) => setAudioFile(e.target.files[0])}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900 transition-all"
          >
            Add Song
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSong;
