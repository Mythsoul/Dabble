import { Database } from "../config/db/db.js";

export const addBookmark = async (userId, postId) => {
    const query = `
        INSERT INTO bookmarks (user_id, post_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, post_id) DO NOTHING
        RETURNING *
    `;
    const result = await Database.query(query, [userId, postId]);
    return result.rows[0];
};

export const removeBookmark = async (userId, postId) => {
    const query = `
        DELETE FROM bookmarks
        WHERE user_id = $1 AND post_id = $2
        RETURNING *
    `;
    const result = await Database.query(query, [userId, postId]);
    return result.rows[0];
};

export const getUserBookmarks = async (userId) => {
    try {
        const query = `
            SELECT p.*, u.username, b.created_at as bookmarked_at,
            EXISTS (
                SELECT 1 FROM bookmarks 
                WHERE user_id = $1 AND post_id = p.id
            ) as is_bookmarked
            FROM bookmarks b
            JOIN posts p ON b.post_id = p.id
            JOIN users u ON p.user_id = u.id
            WHERE b.user_id = $1
            ORDER BY b.created_at DESC
        `;
        const result = await Database.query(query, [userId]);
        return result.rows;
    } catch (error) {
        console.error("Database error in getUserBookmarks:", error);
        throw new Error("Failed to fetch bookmarks");
    }
};
