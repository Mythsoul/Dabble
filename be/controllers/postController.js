import { makePost, likePost, addComment } from "../models/postmodel.js";

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.session.user.id;
        const image_url = req.body.image_url || null;

        const post = await makePost(title, content, user_id, image_url);

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const handleLike = async (req, res) => {
    try {
        const { post_id } = req.params;
        const user_id = req.session.user.id;

        const post = await likePost(post_id, user_id);

        res.status(200).json({
            success: true,
            message: "Post like toggled successfully",
            post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const handleComment = async (req, res) => {
    try {
        const { post_id } = req.params;
        const { comment } = req.body;
        const user_id = req.session.user.id;

        const post = await addComment(post_id, user_id, comment);

        res.status(200).json({
            success: true,
            message: "Comment added successfully",
            post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
