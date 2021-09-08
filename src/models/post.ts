import mongoose from "mongoose";

interface IPost {
  _id: string;
  title: string;
  content: string;
  img: string;
  imgName: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const PostSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    img: String,
    imgName: String,
    date: String,
  },
  { timestamps: { createdAt: "createdAt" } }
);

export default mongoose.model("posts", PostSchema);
