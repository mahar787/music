import DbCon from "@/app/Database/Db";
import Music from "@/app/Models/Music.model.js";
export async function POST(req) {
  try {
    await DbCon();

    const formData = await req.formData();
    const title = formData.get("title");
    const length = formData.get("length");
    const category = formData.get("category");
    const file = formData.get("audio");

    console.log(formData);
    if (!file || !title || !length || !category) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const newMusic = await Music.create({
      title,
      length,
      category,
      audioUrl: file,
    });
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Final error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
