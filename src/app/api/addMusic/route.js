import DbCon from "@/app/Database/Db.js";
import cloudinary from "@/app/Cloudinary/Cloudinary.js";
import Music from "@/app/Models/Music.model.js";

export async function POST(req) {
  try {
    await DbCon();

    const formData = await req.formData();

    const title = formData.get("title");
    const length = formData.get("length");
    const category = formData.get("category");
    const file = formData.get("audio"); // audio file from form

    if (!file || !title || !length || !category) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadedAudio = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "music-audios",
            resource_type: "video", // for mp3/mp4/audio
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const newMusic = await Music.create({
      title,
      length,
      category,
      audioUrl: uploadedAudio.secure_url,
    });

    return Response.json({ success: true, music: newMusic }, { status: 201 });
  } catch (error) {
    console.error("Error uploading music:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
