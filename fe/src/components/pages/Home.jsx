import React from "react"

function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      
      {/* Create post input */}
      <div className="flex gap-3 mb-6 pt-2">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
          <span className="text-white font-bold">U</span>
        </div>
        <div className="flex-1">
          <div className="border-b border-border pb-4">
            <input 
              type="text" 
              placeholder="What's happening?" 
              className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground" 
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
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded-full transition-colors">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feed items */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="border-b border-border pb-4 pt-2">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
                <span className="text-white font-bold">U{i}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <p className="font-bold">Username {i}</p>
                  <p className="text-muted-foreground text-sm">@user{i}</p>
                  <span className="text-muted-foreground text-sm">·</span>
                  <p className="text-muted-foreground text-sm">{i}h</p>
                </div>
                <p className="mt-1">This is an example post on Dablle. The feed would contain multiple posts like this with different content and media.</p>
                
                {/* Post actions */}
                <div className="flex justify-between mt-3 max-w-md">
                  <button className="text-muted-foreground hover:text-blue-500 flex items-center gap-1 group">
                    <div className="p-1.5 rounded-full group-hover:bg-blue-500/10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="text-xs">{i * 5}</span>
                  </button>
                  <button className="text-muted-foreground hover:text-green-500 flex items-center gap-1 group">
                    <div className="p-1.5 rounded-full group-hover:bg-green-500/10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span className="text-xs">{i * 3}</span>
                  </button>
                  <button className="text-muted-foreground hover:text-red-500 flex items-center gap-1 group">
                    <div className="p-1.5 rounded-full group-hover:bg-red-500/10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <span className="text-xs">{i * 7}</span>
                  </button>
                  <button className="text-muted-foreground hover:text-blue-500 flex items-center gap-1 group">
                    <div className="p-1.5 rounded-full group-hover:bg-blue-500/10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home