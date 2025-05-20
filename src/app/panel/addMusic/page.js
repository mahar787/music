"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Music } from "lucide-react";

export default function UploadMusicPage() {
  const [title, setTitle] = useState("");
  const [length, setLength] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  async function getCategory() {
    try {
      let res = await fetch("/api/getCategories");
      let result = await res.json();
      setCategories(result.categories);
    } catch (error) {
      console.log("error in getting categories", error);
    }
  }
  useEffect(() => {
    getCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !length || !category || !audio) {
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("length", length);
    formData.append("category", category);
    formData.append("audio", audio);

    const res = await fetch("/api/addMusic", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Music uploaded successfully!");
      setTitle("");
      setLength("");
      setCategory("");
      setAudio(null);
    } else {
      setMessage(data.error || "❌ Upload failed");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto  p-6 "
    >
      <div className="bg-white mt-28 p-4 py-8 dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <Music className="w-6 h-6 text-blue-500" /> Upload Music
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1 text-zinc-700 dark:text-zinc-200">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Blue Eyes"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-zinc-700 dark:text-zinc-200">
              Length
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="e.g. 3:45"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-zinc-700 dark:text-zinc-200">
              Category
            </label>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="bg-zinc-900 p-2"
            >
              <option value={""}>{category}</option>
              {categories.map((cat, i) => {
                return (
                  <option className="p-2 bg-zinc-700" key={i} value={cat._id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-zinc-700 dark:text-zinc-200">
              Audio File
            </label>
            <input
              type="text"
              onChange={(e) => setAudio(e.target.value)}
              className="w-full bg-zinc-100 dark:bg-zinc-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition-all"
            type="submit"
          >
            <UploadCloud className="w-5 h-5" />
            {loading ? "Uploading..." : "Upload Music"}
          </motion.button>

          {message && (
            <p className="text-center mt-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {message}
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
}
