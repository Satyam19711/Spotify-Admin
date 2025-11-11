import React, { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { verifyAdmin } from "../utils/verifyAdmin";

const AddAlbum = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isVerified = await verifyAdmin();
    if (!isVerified) return;

    if (!name || !imageFile) {
      toast.error("Name and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("bgColor", bgColor);
    formData.append("image", imageFile);

    try {
      setLoading(true);
      await API.post("/album/add", formData);
      toast.success("Album added successfully");
      setName("");
      setDesc("");
      setBgColor("#ffffff");
      setImageFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add album");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      {loading && <Loader />}
      <h2 className="text-2xl font-semibold mb-4">Add Album</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">desc</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
          />
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium">
              Background Color
            </label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="mt-1 h-10 w-16 p-0 border rounded"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 text-white rounded"
          >
            Add Album
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAlbum;
