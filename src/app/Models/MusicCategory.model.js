import mongoose from "mongoose";

const MusicCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.models.MusicCategory ||
  mongoose.model("MusicCategory", MusicCategorySchema);
