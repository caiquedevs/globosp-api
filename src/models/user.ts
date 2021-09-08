import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    phone: String,
  },
  { timestamps: { createdAt: "createdAt" } }
);

export default mongoose.model("users", UserSchema);
