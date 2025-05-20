"use client";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Music } from "lucide-react";
import { Suspense } from "react";

const MusicPlayer = () => {
  const searchParams = useSearchParams();
  const audioUrl = searchParams.get("audioUrl");
  const title = searchParams.get("title") || "Unknown Track";
  const length = searchParams.get("length") || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-screen flex justify-center items-center"
    >
      <div className="px-8 py-16 w-[90vw] sm:w-[80vw] md:w-[70vw] rounded-2xl shadow-xl border dark:bg-zinc-900 dark:border-zinc-800 bg-white border-zinc-200">
        {/* Rotating CD */}
        <div className="flex justify-center mb-6">
          <motion.div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-xl border-4 border-white dark:border-zinc-800">
            <Music className="w-10 h-10 text-white" />
          </motion.div>
        </div>
        {/* Rotating CD */}

        <div className="flex flex-col justify-center gap-4">
          <Music className="w-8 h-8 text-blue-500" />
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white truncate">
            Title: {title}
          </h3>
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white truncate">
            Duration: {length}
          </h3>
        </div>

        <audio className="my-6 w-full text-3xl" controls>
          <source src={audioUrl}></source>
        </audio>
      </div>
    </motion.div>
  );
};
export { MusicPlayer };
export default function Page() {
  return (
    <Suspense
      fallback={<div className="text-white p-4">Loading Player...</div>}
    >
      <MusicPlayer />
    </Suspense>
  );
}
