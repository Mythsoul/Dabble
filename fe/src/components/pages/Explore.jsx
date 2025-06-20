import React, { useState, useEffect } from "react"
import axios from "axios"
import { Postcard } from "../ui/Postcard"

function Explore() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/search?q=${query}`,
        { withCredentials: true }
      );
      setSearchResults(response.data.posts);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      
      {/* Search bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="search" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full p-3 pl-10 text-sm rounded-full bg-accent/30 border-none focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="Search Dabble" 
        />
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          {isSearching ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          ) : (
            <Postcard posts={searchResults} />
          )}
        </div>
      )}

      {/* Trending topics */}
      <div className="bg-accent/30 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-xl mb-4">Trends for you</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-1 hover:bg-accent/50 p-2 rounded-lg transition-colors cursor-pointer">
              <p className="text-xs text-muted-foreground">Trending in Technology</p>
              <p className="font-medium">#{['AI', 'WebDev', 'React', 'JavaScript', 'Coding'][i-1] || ""}</p>
              <p className="text-xs text-muted-foreground">{i * 10}K posts</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Who to follow */}
      <div className="bg-accent/30 rounded-xl p-4">
        <h2 className="font-bold text-xl mb-4">Who to follow</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white font-bold">U{i}</span>
                </div>
                <div>
                  <p className="font-semibold">User Name {i}</p>
                  <p className="text-sm text-muted-foreground">@username{i}</p>
                </div>
              </div>
              <button className="bg-foreground text-background rounded-full px-4 py-1.5 text-sm font-bold hover:bg-foreground/90 transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore