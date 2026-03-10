import { useAuth } from "@/hooks/use-auth";
import { usePosts } from "@/hooks/use-posts";
import { Navbar } from "@/components/Navbar";
import { Stories } from "@/components/Stories";
import { PostCard } from "@/components/PostCard";
import { Loader2 } from "lucide-react";
import { Redirect } from "wouter";

export default function HomePage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: posts, isLoading: isPostsLoading } = usePosts();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>);

  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0 md:pl-[72px] lg:pl-[244px] flex justify-center">
      <Navbar />
      
      <main className="w-full max-w-[820px] pt-14 md:pt-[44px] px-0 xl:px-[20px] flex justify-center xl:justify-start xl:gap-[64px]">
        
        {/* Main Feed Column */}
        <div className="w-full max-w-[470px]">
          <Stories />
          
          <div className="w-full mt-2">
            {isPostsLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : posts?.length === 0 ? (
              <div className="text-center py-20 bg-white border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                <p className="text-gray-600 text-sm">Be the first to share a moment!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {posts?.map((post) => (
                   <PostCard key={post.id || post._id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar for Desktop only */}
        <div className="hidden xl:block w-[319px] pt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <img 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} 
                alt={`${user.username} profile`}
                className="w-[44px] h-[44px] rounded-full group-hover:opacity-80 transition-opacity" 
              />
              
              <div>
                <p className="text-[14px] font-semibold tracking-tight">{user.username}</p>
                <p className="text-[14px] text-gray-600">{user.username}</p>
              </div>
            </div>
            <button className="text-[12px] font-semibold text-blue-500 hover:text-[#00376b] transition-colors">
              Switch
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-[14px] font-semibold text-gray-600">Suggested for you</p>
            <button className="text-[12px] font-semibold hover:text-gray-600 transition-colors hover:opacity-50">
              See All
            </button>
          </div>

          <div className="space-y-[14px]">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 cursor-pointer group">
                  <img src={`https://i.pravatar.cc/150?u=sug${i + 10}`} className="w-[44px] h-[44px] rounded-full" alt="Suggested" />
                  <div>
                    <p className="text-[14px] font-semibold group-hover:opacity-70 tracking-tight">user_suggestion_{i}</p>
                    <p className="text-[12px] text-gray-600">Follows you</p>
                  </div>
                </div>
                <button className="text-[12px] font-semibold text-blue-500 hover:text-[#00376b] transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-[12px] text-gray-600 space-y-[16px]">
            <p className="leading-tight tracking-tight max-w-[300px]">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
            <p className="uppercase">© 2024 INSTAGRAM CLONE</p>
          </div>
        </div>
      </main>
    </div>
  );
}