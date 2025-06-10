import { createNotification as createNotificationModel, getUserNotifications, markNotificationAsRead } from "../models/notificationModel.js";

export const createNotification = async (req, res) => {  
    try {
        const { type, content, fromUserId, postId } = req.body;
        const userId = req.session.user.id;
        const notification = await createNotificationModel(userId, type, content, fromUserId, postId);
        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const getNotifications = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const notifications = await getUserNotifications(userId);
        res.status(200).json({
            success: true,
            notifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const userId = req.session.user.id;
        const notification = await markNotificationAsRead(notificationId, userId);
        res.status(200).json({
            success: true,
            notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
