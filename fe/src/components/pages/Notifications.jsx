import React, { useEffect, useState } from "react"
import axios from "axios"

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/notifications`,
          { withCredentials: true }
        );
        setNotifications(response.data.notifications);
        console.log(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/notifications/${notificationId}/read`,
        {},
        { withCredentials: true }
      );
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "like":
        return (
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        )
      case "follow":
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        )
      case "mention":
        return (
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
        )
      case "repost":
        return (
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  if (loading) {
    return <div className="flex justify-center py-8">
      <div className="animate-spin h-8 w-8 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      
      <div className="space-y-1">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`flex gap-3 p-4 hover:bg-accent/30 transition-colors rounded-lg cursor-pointer ${
              !notification.is_read ? 'bg-accent/10' : ''
            }`}
          >
            {getIcon(notification.type)}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{notification.from_username.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p>
                    <span className="font-bold">{notification.user}</span>{" "}
                    <span className="text-muted-foreground">{notification.content}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No notifications yet
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;