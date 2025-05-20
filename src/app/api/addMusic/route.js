import DbCon from "@/app/Database/Db.js";
import cloudinary from "@/app/Cloudinary/Cloudinary.js";
import Music from "@/app/Models/Music.model.js";
import { Readable } from "stream";
import { pipeline } from "stream/promises";

export async function POST(req) {
  try {
    await DbCon();

    const formData = await req.formData();

    const title = formData.get("title");
    const length = formData.get("length");
    const category = formData.get("category");
    const file = formData.get("audio");

    if (!file || !title || !length || !category) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const readableStream = Readable.from(buffer);

    const uploadedAudio = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "music-audios",
          resource_type: "video", // works for audio too
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      pipeline(readableStream, uploadStream).catch(reject);
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
