import DbCon from "@/app/Database/Db";
import MusicCategory from "@/app/Models/MusicCategory.model.js";

export async function GET() {
  try {
    await DbCon();

    const categories = await MusicCategory.find().sort({ createdAt: -1 });

    return Response.json({ success: true, categories });
  } catch (err) {
    console.error("Fetch Error:", err);
    return Response.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
