import React, { useState } from "react"

function Profile() {
  const [activeTab, setActiveTab] = useState("posts")
  
  const user = {
    name: "John Doe",
    username: "@johndoe",
    bio: "Software developer | Web enthusiast | Coffee lover",
    location: "San Francisco, CA",
    website: "johndoe.com",
    joinDate: "Joined January 2023",
    following: 245,
    followers: 587,
    coverImage: "/placeholder.svg?height=200&width=600",
    profileImage: "/placeholder.svg?height=120&width=120"
  }
  
  const posts = [
    { id: 1, content: "Just launched my new project! Check it out at example.com", time: "2h", likes: 45, comments: 12, reposts: 8 },
    { id: 2, content: "Working on some new features for the app. Can't wait to share them with you all!", time: "1d", likes: 128, comments: 34, reposts: 22 },
    { id: 3, content: "Just attended an amazing tech conference. So many great ideas to implement!", time: "2d", likes: 89, comments: 23, reposts: 15 },
    { id: 4, content: "Thinking about redesigning my portfolio website. Any suggestions?", time: "3d", likes: 215, comments: 56, reposts: 12 },
  ]
  
  return (
    <div>
      {/* Cover image */}
      <div className="h-48 bg-accent/30 rounded-xl overflow-hidden relative mb-16">
        <img 
          src={user.coverImage || "/placeholder.svg"} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        
        {/* Profile image */}
        <div className="absolute -bottom-16 left-4 border-4 border-background rounded-full">
          <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
            <img 
              src={user.profileImage || "/placeholder.svg"} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Edit profile button */}
        <button className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-foreground px-4 py-1.5 rounded-full border border-border font-semibold hover:bg-accent/30 transition-colors">
          Edit profile
        </button>
      </div>
      
      {/* Profile info */}
      <div className="mt-4 px-4">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">{user.username}</p>
        
        <p className="mt-4">{user.bio}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground">
          {user.location && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{user.location}</span>
            </div>
          )}
          
          {user.website && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <a href="">{user.website}</a>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{user.joinDate}</span>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <button className="hover:underline">
            <span className="font-bold">{user.following}</span>{" "}
            <span className="text-muted-foreground">Following</span>
          </button>
          <button className="hover:underline">
            <span className="font-bold">{user.followers}</span>{" "}
            <span className="text-muted-foreground">Followers</span>
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-border mt-6">
        <button 
          className={"flex-1 py-3 font-medium relative"}
          onClick={() => setActiveTab("posts")}
        >
          Posts
          {activeTab === "posts" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>}
        </button>
        <button 
          className={"flex-1 py-3 font-medium relative"}
          onClick={() => setActiveTab("replies")}
        >
          Replies
          {activeTab === "replies" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>}
        </button>
        <button 
          className={"flex-1 py-3 font-medium relative "}
          onClick={() => setActiveTab("media")}
        >
          Media
          {activeTab === "media" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>}
        </button>
        <button 
          className={"flex-1 py-3 font-medium relative "}
          onClick={() => setActiveTab("likes")}
        >
          Likes
          {activeTab === "likes" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>}
        </button>
      </div>
      
      {/* Posts */}
      {activeTab === "posts" && (
        <div className="space-y-4 mt-4">
          {posts.map((post) => (
            <div key={post.id} className="border-b border-border pb-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white font-bold">{user.name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-muted-foreground text-sm">{user.username}</p>
                    <span className="text-muted-foreground text-sm">·</span>
                    <p className="text-muted-foreground text-sm">{post.time}</p>
                  </div>
                  <p className="mt-1">{post.content}</p>
                  
                  {/* Post actions */}
                  <div className="flex justify-between mt-3 max-w-md">
                    <button className="text-muted-foreground hover:text-blue-500 flex items-center gap-1 group">
                      <div className="p-1.5 rounded-full group-hover:bg-blue-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <span className="text-xs">{post.comments}</span>
                    </button>
                    <button className="text-muted-foreground hover:text-green-500 flex items-center gap-1 group">
                      <div className="p-1.5 rounded-full group-hover:bg-green-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <span className="text-xs">{post.reposts}</span>
                    </button>
                    <button className="text-muted-foreground hover:text-red-500 flex items-center gap-1 group">
                      <div className="p-1.5 rounded-full group-hover:bg-red-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <span className="text-xs">{post.likes}</span>
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
      )}
      
      {/* Other tabs would be implemented similarly */}
      {activeTab !== "posts" && (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">No {activeTab} to show yet.</p>
        </div>
      )}
    </div>
  )
}

export default Profile