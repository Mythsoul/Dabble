import React from "react"

function Bookmarks() {
  const bookmarks = [
    { id: 1, user: "User One", username: "@user1", content: "This is a bookmarked post about technology and innovation.", time: "2h", likes: 45, comments: 12 },
    { id: 2, user: "User Two", username: "@user2", content: "Check out this amazing new feature in the latest update!", time: "1d", likes: 128, comments: 34 },
    { id: 3, user: "User Three", username: "@user3", content: "Just launched our new product. Would love to hear your feedback!", time: "2d", likes: 89, comments: 23 },
    { id: 4, user: "User Four", username: "@user4", content: "Here's a thread about the future of web development and where it's heading in the next few years.", time: "3d", likes: 215, comments: 56 },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookmarks</h1>
      
      {bookmarks.length > 0 ? (
        <div className="space-y-4">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="border-b border-border pb-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white font-bold">{bookmark.user[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="font-bold">{bookmark.user}</p>
                    <p className="text-muted-foreground text-sm">{bookmark.username}</p>
                    <span className="text-muted-foreground text-sm">·</span>
                    <p className="text-muted-foreground text-sm">{bookmark.time}</p>
                  </div>
                  <p className="mt-1">{bookmark.content}</p>
                  
                  {/* Post actions */}
                  <div className="flex justify-between mt-3 max-w-md">
                    <button className="text-muted-foreground hover:text-blue-500 flex items-center gap-1 group">
                      <div className="p-1.5 rounded-full group-hover:bg-blue-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <span className="text-xs">{bookmark.comments}</span>
                    </button>
                    <button className="text-muted-foreground hover:text-green-500 flex items-center gap-1 group">
                      <div className="p-1.5 rounded-full group-hover:bg-green-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <span className="text-xs">{Math.floor(bookmark.likes / 3)}</span>
                    </button>
                    <button className="text-muted-foreground hover:text-red-500 flex items-center gap-1 group">
                      <div className="p-1.5 rounded-full group-hover:bg-red-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <span className="text-xs">{bookmark.likes}</span>
                    </button>
                    <button className="text-blue-500 flex items-center gap-1 group">
                      <div className="p-1.5 rounded-full group-hover:bg-blue-500/10">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
  )
}

export default Bookmarks