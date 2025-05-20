"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Send } from "lucide-react";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) return alert("Both fields are required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      setLoading(true);
      setMessage("");
      const res = await fetch("/api/addCategory", {
        method: "POST",
        body: formData,
      });
      setMessage("✅ Category added successfully!");
      setName("");
      setImage(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 p-6">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-white space-y-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center">Add New Category</h2>

        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 placeholder-white/50 border border-white/20 focus:outline-none"
        />

        <label className="flex items-center gap-3 cursor-pointer">
          <Upload size={20} />
          <span>Select Image</span>
          <input type="file" onChange={handleImageChange} className="hidden" />
        </label>

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="rounded-lg w-full h-40 object-cover"
          />
        )}

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-xl font-semibold transition"
        >
          <Send size={18} /> {loading ? "Submitting..." : "Submit"}
        </motion.button>

        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </motion.form>
    </div>
  );
}
