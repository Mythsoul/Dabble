import React, { useEffect, useState } from "react"
import { Postcard } from "../ui/Postcard"
import axios from "axios";
import useAuthStore from "@/store/AuthStore"

function Home() {
   const [posts, setPosts] = useState([]); 
   const [newPost, setNewPost] = useState({
     title: "",
     content: ""
   });
   const [isPosting, setIsPosting] = useState(false);
   const currentUser = useAuthStore((state) => state.user);

   axios.defaults.withCredentials = true;
   const fetchPosts = async () => { 
    try { 
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/posts" , {withCredentials: true});
      setPosts(response.data.posts); // Extract posts array from response
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => { 
   fetchPosts();
  }, []);

  const handlePost = async () => {
     if (!newPost.content.trim() || !newPost.title.trim()) return;
     
     setIsPosting(true);
     try {
       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
         title: newPost.title,
         content: newPost.content,
       }, { withCredentials: true });
       
       setNewPost({ title: "", content: "" });
       fetchPosts(); // Refresh posts
     } catch (error) {
       console.error("Error creating post:", error);
     } finally {
       setIsPosting(false);
     }
   };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      
      {/* Create post input */}
      <div className="flex gap-3 mb-6 pt-2">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
          <span className="text-white font-bold">{currentUser?.username?.[0]?.toUpperCase() || 'U'}</span>
        </div>
        <div className="flex-1">
          <div className="border-b border-border pb-4">
            <input 
              type="text" 
              placeholder="Post title"
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground mb-2" 
            />
            <textarea 
              placeholder="What's happening?"
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground resize-none"
              rows="2"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <button className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <button 
                onClick={handlePost}
                disabled={isPosting || !newPost.content.trim() || !newPost.title.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded-full transition-colors disabled:opacity-50"
              >
                {isPosting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feed items */}
      <Postcard posts={posts} />
    </div>
  )
}

export default Home