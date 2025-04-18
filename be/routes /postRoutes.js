import express from "express";
import { createPost, handleLike, handleComment } from "../controllers/postController.js";
import { Authmiddleware } from "../middlewares/Authmiddleware.js";

const router = express.Router();

// All post routes should be authenticated
router.use(Authmiddleware);

// Post CRUD routes
router.post("/api/posts",createPost);
router.post("/api/posts/:post_id/like", handleLike);
router.post("/api/posts/:post_id/comment", handleComment);

export const PostRoutes = router;
