import { Database } from "../config/db/db.js";

export const createNotification = async (userId, type, content, fromUserId, postId) => {
    const query = `
        INSERT INTO notifications (user_id, type, content, from_user_id, post_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    const result = await Database.query(query, [userId, type, content, fromUserId, postId]);
    return result.rows[0];
};

export const getUserNotifications = async (userId) => {
    const query = `
        SELECT n.*, u.username as from_username 
        FROM notifications n 
        LEFT JOIN users u ON n.from_user_id = u.id 
        WHERE n.user_id = $1 
        ORDER BY n.created_at DESC
    `;
    const result = await Database.query(query, [userId]);
    return result.rows;
};

export const markNotificationAsRead = async (notificationId, userId) => {
    const query = `
        UPDATE notifications 
        SET is_read = true 
        WHERE id = $1 AND user_id = $2 
        RETURNING *
    `;
    const result = await Database.query(query, [notificationId, userId]);
    return result.rows[0];
};
