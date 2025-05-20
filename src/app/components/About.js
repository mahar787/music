"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      className="py-16 px-4 max-w-3xl mx-auto text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4">About Us</h2>
      <p className="text-gray-600">
        We&apos;re just a bunch of music lovers creating a place for our
        favorite tracks. Whether it&apos;s soul-stirring qawwalis, soft naat, or
        vibey songs, it&apos;s all here.
      </p>
    </motion.section>
  );
}
