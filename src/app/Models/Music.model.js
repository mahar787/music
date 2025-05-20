import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  length: {
    type: String, // e.g., "3:45" or "02:10"
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.models.Music || mongoose.model("Music", MusicSchema);
