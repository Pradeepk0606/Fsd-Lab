import { Plus } from "lucide-react";

const MOCK_STORIES = [
  { id: 1, username: "your_story", image: "https://api.dicebear.com/7.x/initials/svg?seed=your_story", isOwn: true },
  { id: 2, username: "alex_photography", image: "https://i.pravatar.cc/150?u=2", hasStory: true },
  { id: 3, username: "sarah.designs", image: "https://i.pravatar.cc/150?u=3", hasStory: true },
  { id: 4, username: "travel_with_mike", image: "https://i.pravatar.cc/150?u=4", hasStory: true },
  { id: 5, username: "foodie.dreams", image: "https://i.pravatar.cc/150?u=5", hasStory: true },
  { id: 6, username: "tech_guru", image: "https://i.pravatar.cc/150?u=6", hasStory: true },
  { id: 7, username: "lifestyle_vibe", image: "https://i.pravatar.cc/150?u=7", hasStory: true },
  { id: 8, username: "daily_coffee", image: "https://i.pravatar.cc/150?u=8", hasStory: true }
];

export function Stories() {
  return (
    <div className="bg-background border-b sm:mb-6">
      <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-0 py-4">
        {MOCK_STORIES.map((story, i) => (
          <div key={story.id} className="flex flex-col items-center flex-shrink-0 cursor-pointer group w-[66px] sm:w-[72px]">
            <div className={`relative ${story.isOwn ? 'bg-transparent' : story.hasStory ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' : 'bg-gray-200'} p-[2px] rounded-full`}>
              {story.isOwn && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 z-10">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              )}
              <div className={`${story.isOwn ? 'bg-gray-100' : 'bg-white'} p-[2px] rounded-full`}>
                <img
                  src={story.image}
                  alt={story.username}
                  className="w-[62px] h-[62px] sm:w-[66px] sm:h-[66px] rounded-full object-cover border-2 border-white group-hover:scale-95 transition-transform" />
              </div>
            </div>
            <span className="text-xs mt-2 w-[74px] truncate text-center">
              {story.isOwn ? "Your story" : story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}