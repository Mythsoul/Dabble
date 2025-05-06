import React from "react"

function Messages() {
  const conversations = [
    { id: 1, user: "User One", username: "@user1", lastMessage: "Hey, how's it going?", time: "2h", unread: true },
    { id: 2, user: "User Two", username: "@user2", lastMessage: "Did you see the latest post?", time: "5h", unread: false },
    { id: 3, user: "User Three", username: "@user3", lastMessage: "Thanks for the follow!", time: "1d", unread: true },
    { id: 4, user: "User Four", username: "@user4", lastMessage: "Let's catch up soon", time: "2d", unread: false },
    { id: 5, user: "User Five", username: "@user5", lastMessage: "Great post yesterday!", time: "3d", unread: false },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      
      {/* Search messages */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="search" 
          className="block w-full p-2.5 pl-10 text-sm rounded-full bg-accent/30 border-none focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="Search messages" 
        />
      </div>
      
      {/* Conversations list */}
      <div className="space-y-1">
        {conversations.map((conversation) => (
          <div 
            key={conversation.id} 
            className="flex items-center gap-3 p-3 hover:bg-accent/30 transition-colors rounded-lg cursor-pointer relative"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
              <span className="text-white font-bold">{conversation.user[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="truncate">
                  <p className="font-semibold">{conversation.user}</p>
                  <p className="text-sm text-muted-foreground truncate">{conversation.username}</p>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conversation.time}</p>
              </div>
                <p className="text-sm text-muted-foreground truncate">
                {conversation.lastMessage}
              </p>
            </div>
           
          </div>
        ))}
      </div>
      
      
    </div>
  )
}

export default Messages