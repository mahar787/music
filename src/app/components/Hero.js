"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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

  return (
    <main className="min-h-screen bg-bg text-black">
      {/* Navbar */}

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-48">
        <div>
          <h1 className="text-[#F24901] text-4xl md:text-5xl my-3 font-bold">
            Categories
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.isArray(categories) &&
            categories.length > 0 &&
            categories.map((cat, index) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative h-48 bg-gray-200 cursor-pointer rounded-lg overflow-hidden shadow-lg"
              >
                <Link href={`/category/${cat._id}`}>
                  <Image
                    src={`${cat.image}`}
                    fill
                    unoptimized
                    alt={cat?.name}
                    className="object-cover"
                  />
                  <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
                    <h2 className="text-white text-xl font-bold">
                      {cat?.name}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Highlight Section */}
      <section className="px-4  py-12 bg-main text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Best Music Platform for You</h2>
        <p>Enjoy curated tracks that match your vibe 🎧</p>
      </section>

      {/* Footer */}
      <footer className="px-4  py-6 text-center text-sm bg-black text-white">
        © 2025 MyMusic. All rights reserved.
      </footer>
    </main>
  );
}
