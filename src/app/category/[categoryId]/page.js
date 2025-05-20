"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Disc3 } from "lucide-react";
import Link from "next/link";
const Page = () => {
  const { categoryId } = useParams();
  const [music, setMusic] = useState([]);
  async function getMusic(categoryId) {
    try {
      let res = await fetch("/api/getMusic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId }),
      });
      let result = await res.json();
      console.log(result.music);
      setMusic(result.music);
    } catch (error) {
      console.log("error in fetching specific category music", error);
    }
  }
  useEffect(() => {
    getMusic(categoryId);
  }, []);
  return (
    <div className="pt-30 px-6 sm:px-10">
      <h1 className="text-3xl">List of Music:</h1>
      {Array.isArray(music) &&
        music.length > 0 &&
        music.map((item, i) => {
          return (
            <Link
              key={i}
              href={`/player?audioUrl=${item?.audioUrl}&title=${item?.title}&length=${item.length}`}
            >
              <div className="flex border rounded-lg p-2 gap-2 items-center my-3">
                <Disc3 className="text-white" />
                <h1 className="text-[#F24901] font-bold text-xl md:text-2xl">
                  {item?.title}
                </h1>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Page;
