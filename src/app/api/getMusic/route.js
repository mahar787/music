import DbCon from "@/app/Database/Db";
import Music from "@/app/Models/Music.model.js";
export async function POST(req) {
  try {
    await DbCon();
    let body = await req.json();
    let categoryId = body.categoryId;

    const music = await Music.find({ category: categoryId }).sort({
      createdAt: -1,
    });

    return Response.json({ success: true, music });
  } catch (err) {
    console.error("Fetch Error:", err);
    return Response.json({ error: "Failed to fetch music" }, { status: 500 });
  }
}
