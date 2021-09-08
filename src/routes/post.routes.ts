import { Router } from "express";
import Auth from "../middlewares/Auth";
import uploadPost from "../middlewares/upload";

import PostController from "../controllers/PostController";
const router = Router();

// Posts
router.get("/posts", PostController.index);
router.get("/posts/:postId", PostController.show);

router.post(
  "/post",
  Auth.verify,
  uploadPost.single("image"),
  PostController.create
);

router.put(
  "/post/:postId",
  Auth.verify,
  uploadPost.single("image"),
  PostController.update
);

router.delete("/post/:postId", Auth.verify, PostController.delete);

export default router;
