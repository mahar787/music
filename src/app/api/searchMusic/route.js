import DbCon from "@/app/Database/Db";
import Music from "@/app/Models/Music.model.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  await DbCon();

  try {
    const music = await Music.find({
      title: { $regex: query, $options: "i" }, // case-insensitive partial match
    }).limit(10);

    return NextResponse.json({ success: true, music });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
