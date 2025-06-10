import axios from "axios";
import useAuthStore from "@/store/AuthStore";

export function Postcard({ posts, onPostUpdate }) {
    const currentUser = useAuthStore((state) => state.user);

    const createNotification = async (type, content, postId, userId) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/createnotification`,
                {
                    type,
                    content,
                    fromUserId: currentUser.id,
                    postId
                },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error creating notification:", error);
        }
    };

    const handleLike = async (post) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/posts/${post.id}/like`,
                {},
                { withCredentials: true }
            );
            
            // Create notification only if the user is liking (not unliking)
            if (!post.likers_id?.includes(currentUser.id)) {
                await createNotification(
                    "like",
                    "liked your post",
                    post.id,
                    post.user_id
                );
            }
            
            onPostUpdate?.();
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleBookmark = async (postId) => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/bookmark`, {}, 
                { withCredentials: true }
            );
            onPostUpdate?.();
        } catch (error) {
            console.error("Error bookmarking post:", error);
        }
    };

    return (
        <div className="space-y-4">
            {Array.isArray(posts) && posts.map((post) => (
                <div key={post.id} className="border-b border-border pb-4 pt-2">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
                            <span className="text-white font-bold">
                                {post.username?.[0] || 'U'}
                            </span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-1">
                                <p className="font-bold">{post.username || 'Username'}</p>
                                <p className="text-muted-foreground text-sm">@{post?.username || 'user'}</p>
                                <span className="text-muted-foreground text-sm">·</span>
                                <p className="text-muted-foreground text-sm">1h</p>
                            </div>
                            <p className="mt-1">{post.content}</p>
                            {post.image_url && (
                                <img src={post.image_url} alt="Post media" className="mt-2 rounded-lg max-w-full" />
                            )}
                            
                            <div className="flex justify-between mt-3 max-w-md">
                                <button className="text-muted-foreground hover:text-blue-500 flex items-center gap-1 group">
                                    <div className="p-1.5 rounded-full group-hover:bg-blue-500/10">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs">{Object.keys(post.comments || {}).length}</span>
                                </button>
                                <button className="text-muted-foreground hover:text-green-500 flex items-center gap-1 group">
                                    <div className="p-1.5 rounded-full group-hover:bg-green-500/10">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <span className="text-xs">0</span>
                                </button>
                                <button 
                                    onClick={() => handleLike(post)}
                                    className={`${post.likers_id?.includes(currentUser.id) ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500 flex items-center gap-1 group`}
                                >
                                    <div className="p-1.5 rounded-full group-hover:bg-red-500/10">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs">{post.likers_id?.length || 0}</span>
                                </button>
                                <button 
                                    onClick={() => handleBookmark(post.id)}
                                    className={`${post.is_bookmarked ? 'text-blue-500' : 'text-muted-foreground'} hover:text-blue-500 flex items-center gap-1 group`}
                                >
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
    );
}