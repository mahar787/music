"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Disc3, Search } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { categoryId } = useParams();
  const [music, setMusic] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  async function getMusic(categoryId) {
    try {
      const res = await fetch("/api/getMusic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId }),
      });
      const result = await res.json();
      setMusic(result.music);
    } catch (error) {
      console.log("error in fetching specific category music", error);
    }
  }

  useEffect(() => {
    getMusic(categoryId);
  }, []);
  const filteredMusic = music.filter((item) =>
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#0f0f0f] min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
        🎵 List of Music
      </h1>
      {/* search bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search music by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 md:w-1/3 bg-[#1a1a1a] text-white placeholder-gray-400 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F24901] transition-all duration-200"
        />
        <Search className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
      </div>
      {/* search bar */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(filteredMusic) && filteredMusic.length > 0 ? (
          filteredMusic.map((item, i) => (
            <Link
              key={i}
              href={`/player?audioUrl=${item?.audioUrl}&title=${item?.title}&length=${item?.length}`}
              className="bg-[#1a1a1a] hover:bg-[#262626] transition-all duration-300 p-4 rounded-2xl shadow-md hover:shadow-lg flex items-center gap-4 group"
            >
              <div className="p-3 bg-[#F24901] rounded-full transition-all duration-300 group-hover:rotate-180">
                <Disc3 className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg sm:text-xl">
                  {item?.title}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Length: {item?.length}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-300">No music found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
