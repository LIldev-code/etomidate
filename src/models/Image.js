import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    data: { type: String, required: true }, // base64 encoded
  },
  { timestamps: true }
);

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
