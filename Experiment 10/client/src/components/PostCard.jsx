import { useState } from "react";
import { useLikePost } from "@/hooks/use-posts";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

export function PostCard({ post }) {
  const { mutate: likePost } = useLikePost();
  const [isLikedLocally, setIsLikedLocally] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    if (!isLikedLocally) {
      setIsLikedLocally(true);
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 1000);
      likePost(post._id || post.id);
    } else {
      setIsLikedLocally(false);
      // In a real app we would call unlikePost here
    }
  };

  const handleDoubleClickLike = (e) => {
    e.preventDefault();
    if (!isLikedLocally) {
      handleLike();
    } else {
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 1000);
    }
  };

  const date = new Date(post.createdAt || Date.now());
  const hoursAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
  const timeDisplay = hoursAgo > 24 ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : `${hoursAgo || 1} h`;

  return (
    <div className="bg-white border border-gray-200 rounded-sm mb-4 max-w-[470px] w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center space-x-3 cursor-pointer group">
          <img 
             src={post.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${post.username}`} 
             alt={`${post.username} profile`}
             className="w-8 h-8 rounded-full bg-gray-200 object-cover border border-gray-300" 
          />
          <div className="flex items-center gap-1">
             <span className="font-semibold text-sm text-gray-900 group-hover:opacity-70 transition-opacity">
               {post.username}
             </span>
             <span className="text-gray-400 text-xs font-semibold px-1">•</span>
             <span className="text-gray-600 text-sm">{timeDisplay}</span>
          </div>
        </div>
        <button className="text-gray-900 hover:opacity-50">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative w-full bg-black flex items-center justify-center overflow-hidden cursor-pointer"
        onDoubleClick={handleDoubleClickLike}>
        
        <img
          src={post.image}
          alt={`Post by ${post.username}`}
          className="object-contain w-full max-h-[585px]"
          loading="lazy" />
        
        {showHeartAnim && (
          <div className="absolute inset-0 flex items-center justify-center z-10 animate-in fade-in zoom-in duration-300">
            <Heart className="w-24 h-24 text-white fill-white drop-shadow-2xl opacity-90" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="hover:opacity-60 transition-opacity active:scale-90 transform">
              <Heart className={`w-6 h-6 ${isLikedLocally || post.likes > 0 ? "fill-red-500 text-red-500" : "text-gray-900"}`} />
            </button>
            <button className="hover:opacity-60 transition-opacity active:scale-90 transform">
              <MessageCircle className="w-6 h-6 text-gray-900" />
            </button>
            <button className="hover:opacity-60 transition-opacity active:scale-90 -rotate-12 mt-[-2px]">
              <Send className="w-6 h-6 text-gray-900" />
            </button>
          </div>
          <button 
             onClick={() => setIsBookmarked(!isBookmarked)}
             className="hover:opacity-60 transition-opacity active:scale-90 transform">
            <Bookmark className={`w-6 h-6 ${isBookmarked ? "fill-gray-900 text-gray-900" : "text-gray-900"}`} />
          </button>
        </div>

        {/* Likes */}
        <div className="font-semibold text-[14px] text-gray-900 mb-1">
          {post.likes + (isLikedLocally ? 1 : 0)} likes
        </div>

        {/* Caption */}
        <div className="text-[14px] text-gray-900 mb-1">
          <span className="font-semibold cursor-pointer hover:opacity-70 mr-1">{post.username}</span>
          <span>{post.caption}</span>
        </div>
        
        {/* Comments Hint */}
        <div className="text-gray-600 text-[14px] cursor-pointer mb-2 hover:opacity-70 transition-opacity">
           View all 12 comments
        </div>
        
        {/* Add comment quick input */}
        <div className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="text-[14px] flex-1 border-none focus:outline-none bg-transparent text-gray-900 placeholder-gray-600" 
            />
            {comment.trim() && (
               <button 
                  onClick={() => setComment("")}
                  className="text-[14px] font-semibold text-blue-500 hover:text-blue-900 transition-colors">
                  Post
               </button>
            )}
        </div>
      </div>
    </div>
  );
}