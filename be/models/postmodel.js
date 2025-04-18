import dotenv from "dotenv"
import { Database } from "../config/db/db.js";
dotenv.config();

export const makePost = async (title, content, user_id, image_url = null) => {
    // Validate required fields
    if (!title?.trim() || !content?.trim() || !user_id) {
        throw new Error("Title, content and user ID are required");
    }

    // Validate content length
    if (content.length < 10) {
        throw new Error("Content must be at least 10 characters long");
    }

    // Validate title length
    if (title.length < 3 || title.length > 255) {
        throw new Error("Title must be between 3 and 255 characters");
    }

    try {
        const query = `
            INSERT INTO posts (title, content, user_id, image_url, likers_id, comments) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *
        `;
        
        const values = [
            title,
            content,
            user_id,
            image_url,
            [], // Empty array for likers_id
            [] // Empty array for comments
        ];

        const response = await Database.query(query, values);
        return response.rows[0];
    } catch (error) {
        throw new Error(`Failed to create post: ${error.message}`);
    }
}

export const likePost = async (post_id, user_id) => {
    if (!post_id || !user_id) {
        throw new Error("Post ID and User ID are required");
    }

    try {
        // Check if user already liked the post
        const post = await Database.query(
            "SELECT likers_id FROM posts WHERE id = $1",
            [post_id]
        );

        if (!post.rows[0]) {
            throw new Error("Post not found");
        }

        const likers = post.rows[0].likers_id || [];
        
        // Toggle like
        const newLikers = likers.includes(user_id) 
            ? likers.filter(id => id !== user_id)
            : [...likers, user_id];

        const response = await Database.query(
            "UPDATE posts SET likers_id = $1 WHERE id = $2 RETURNING *",
            [newLikers, post_id]
        );

        return response.rows[0].likers_id;
    } catch (error) {
        throw new Error(`Failed to update post likes: ${error.message}`);
    }
}

export const addComment = async (post_id, user_id, comment) => {
    if (!post_id || !user_id || !comment?.trim()) {
        throw new Error("Post ID, User ID and comment are required");
    }

    try {
        const post = await Database.query(
            "SELECT comments FROM posts WHERE id = $1",
            [post_id]
        );

        if (!post.rows[0]) {
            throw new Error("Post not found");
        }

        const comments = post.rows[0].comments || [];
        const newComment = {
            id: crypto.randomUUID(),
            user_id,
            content: comment,
            created_at: new Date().toISOString()
        };

        const response = await Database.query(
            "UPDATE posts SET comments = $1 WHERE id = $2 RETURNING *",
            [[...comments, newComment], post_id]
        );

        return response.rows[0].comments;
    } catch (error) {
        throw new Error(`Failed to add comment: ${error.message}`);
    }
}
