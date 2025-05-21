"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback, useEffect } from "react";
import { Search, X } from "lucide-react";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // ✅ Actual search function
  const handleSearch = async (value) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/searchMusic?query=${value}`);
      const data = await res.json();
      setResults(data.music || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // ✅ Debounced version
  const debouncedSearch = useCallback(
    debounce(handleSearch, 500), // 500ms debounce
    []
  );

  // ✅ Custom debounce function (no library used)
  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  return (
    <>
      <nav
        style={{
          backgroundColor: "rgba(255,255,255,.2)",
          backdropFilter: "blur(10px)",
        }}
        className="flex justify-between items-center px-6 py-4 shadow-md fixed w-full z-50"
      >
        <div className="flex items-center gap-3">
          <Image src="/logo.png" width={40} height={40} alt="Logo" />
          <h1 className="text-xl font-bold text-main text-[#F24901]">
            Rhythimc Bytes
          </h1>
        </div>

        <ul className="flex gap-6 font-medium text-black items-center">
          <Link
            href={"/"}
            className="hover:text-main cursor-pointer transition text-[#F24901]"
          >
            Home
          </Link>
          <button onClick={() => setShowModal(true)}>
            <Search className="text-[#F24901] hover:scale-110 transition" />
          </button>
        </ul>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-start pt-40 px-4">
          <div className="bg-[#1a1a1a] w-full max-w-xl rounded-xl p-6 shadow-lg relative text-white">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
              onClick={() => {
                setShowModal(false);
                setQuery("");
                setResults([]);
              }}
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Search Music</h2>
            <input
              type="text"
              placeholder="Type music title..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#F24901]"
            />

            <div className="mt-4 max-h-60 overflow-y-auto">
              {results.length > 0 ? (
                results.map((item, i) => (
                  <Link
                    key={i}
                    href={`/player?audioUrl=${item.audioUrl}&title=${item.title}&length=${item.length}`}
                    className="block py-2 px-3 rounded-md hover:bg-[#333] transition"
                    onClick={() => setShowModal(false)}
                  >
                    🎵 {item.title}
                  </Link>
                ))
              ) : query ? (
                <p className="text-gray-400 mt-2">No results found.</p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
