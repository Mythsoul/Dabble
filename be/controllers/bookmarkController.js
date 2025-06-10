import { addBookmark, removeBookmark, getUserBookmarks } from "../models/bookmarkModel.js";

export const createBookmark = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.session.user.id;
        
        const bookmark = await addBookmark(userId, postId);
        
        res.status(201).json({
            success: true,
            message: "Post bookmarked successfully",
            bookmark
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const toggleBookmark = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.session.user.id;
        
        if (!postId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Post ID and User ID are required"
            });
        }
        
        let bookmark = await addBookmark(userId, postId);
        if (!bookmark) {
            bookmark = await removeBookmark(userId, postId);
        }
        
        res.status(200).json({
            success: true,
            message: bookmark ? "Post bookmarked" : "Bookmark removed",
            bookmark
        });
    } catch (error) {
        console.error("Toggle bookmark error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBookmarks = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No session found"
            });
        }

        const userId = req.session.user.id;
        const bookmarks = await getUserBookmarks(userId);
        
        res.status(200).json({
            success: true,
            bookmarks
        });
    } catch (error) {
        console.error("Get bookmarks error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
