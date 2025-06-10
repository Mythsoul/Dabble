import React, { useEffect, useState } from "react"
import axios from "axios"
import { Postcard } from "../ui/Postcard"

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookmarks`,
        { withCredentials: true }
      );
      setBookmarks(response.data.bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-8">
      <div className="animate-spin h-8 w-8 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookmarks</h1>
      
      {bookmarks.length > 0 ? (
        <Postcard posts={bookmarks} onPostUpdate={fetchBookmarks} />
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/50 flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Save posts for later</h2>
          <p className="text-muted-foreground">Bookmark posts to easily find them again in the future.</p>
        </div>
      )}
    </div>
  );
}

export default Bookmarks;