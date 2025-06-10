import express from "express";
import { createPost, handleLike, handleComment, getallPosts, GetUserPosts } from "../controllers/postController.js";
import { Authmiddleware } from "../middlewares/Authmiddleware.js";
import { GetuserFromId } from "../controllers/UserController.js";
import { getNotifications , markAsRead } from "../controllers/notificationController.js";
import { toggleBookmark , getBookmarks, createBookmark } from "../controllers/bookmarkController.js";
import { createNotification } from "../controllers/notificationController.js";
const router = express.Router();

// All post routes should be authenticated
router.use(Authmiddleware);

// Post CRUD routes
router.post("/api/posts",  createPost);
router.post("/api/posts/:post_id/like", handleLike);
router.post("/api/posts/:post_id/comment", handleComment);
router.get("/api/posts" , getallPosts);

// Add user profile route
router.get("/api/users/:user_id", GetuserFromId);
router.get("/api/users/:user_id/posts", GetUserPosts);

// notification routes 

router.post("/api/createnotification", createNotification);
router.get("/api/notifications", getNotifications);
router.put("/api/notifications/:notificationId/read", markAsRead);

// Bookmark routes - Fix duplicate routes
router.post("/api/posts/:postId/bookmark", toggleBookmark);
router.get("/api/bookmarks", getBookmarks);

export const PostRoutes = router;
