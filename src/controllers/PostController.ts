import * as dotenv from "dotenv";
import crypto from "crypto";
import fs from "fs";
import path from "path";

import Connection from "../models/post";
import dateGenerator from "../utils/dateGenerator";

const useDate = dateGenerator();
dotenv.config();

export default class PostController {
  static async index(req: any, res: any) {
    try {
      const response = await Connection.find();
      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json({ msg: "Ocorreu um erro inesperado" });
    }
  }

  static async show(req: any, res: any) {
    const { postId } = req.params;
    try {
      const response = await Connection.findOne({ _id: postId });
      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json({ msg: "Ocorreu um erro inesperado" });
    }
  }

  static async create(req: any, res: any) {
    const img = `${process.env.URLAPI}images/${req.file?.filename}`;
    const imgName = req.file?.filename;

    const payload = {
      title: req.body.title,
      content: req.body.content,
      img: req.file ? img : "",
      imgName: req.file ? imgName : "",
      date: useDate.prevOrNextMonth(0),
    };

    try {
      const response = await Connection.create(payload);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ msg: "Ocorreu um erro inesperado" });
    }
  }

  static async update(req: any, res: any) {
    const { postId } = req.params;
    const currentPost: any = await Connection.findOne({ _id: postId });

    const img = `${process.env.URLAPI}images/${req.file?.filename}`;
    const imgName = req.file?.filename;

    const payload: any = {
      title: req.body.title,
      content: req.body.content,
    };

    if (req.file) {
      payload.img = img;
      payload.imgName = imgName;
    }

    try {
      if (req.file && currentPost.img) {
        fs.unlinkSync(
          path.join(
            __dirname,
            "..",
            "..",
            "public",
            "uploads",
            "posts",
            `${currentPost.imgName}`
          )
        );
      }

      await Connection.updateOne({ _id: postId }, { $set: payload });
      return res.status(200).json({ _id: postId, ...payload });
    } catch (error) {
      return res.status(404).json({ msg: "Ocorreu um erro inesperado" });
    }
  }

  static async delete(req: any, res: any) {
    const { postId } = req.params;

    const currentPost: any = Connection.findOne({ _id: postId });

    try {
      if (currentPost.img) {
        fs.unlinkSync(
          path.join(
            __dirname,
            "..",
            "..",
            "public",
            "uploads",
            "posts",
            `${currentPost.imgName}`
          )
        );
      }

      await Connection.deleteOne({ _id: postId });
      return res.status(200).json({ _id: postId });
    } catch (error) {
      return res.status(404).json({ msg: "Ocorreu um erro inesperado" });
    }
  }
}
