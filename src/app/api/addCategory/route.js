import DbCon from "@/app/Database/Db";
import MusicCategory from "@/app/Models/MusicCategory.model.js";
import cloudinary from "@/app/Cloudinary/Cloudinary.js";
export async function POST(req) {
  try {
    await DbCon();

    const formData = await req.formData();
    const name = formData.get("name");
    const imageFile = formData.get("image");

    if (!name || !imageFile) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "musicCategories" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });
    const newCategory = await MusicCategory.create({
      name,
      image: uploadResult.secure_url,
    });

    return Response.json({ success: true, category: newCategory });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
