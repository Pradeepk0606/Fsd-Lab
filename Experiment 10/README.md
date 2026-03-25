# Instagram Clone - Project Structure & Code Documentation

## Project Structure

```
├───package.json
├───client
│   │   index.html
│   │
│   └───src
│       │   App.jsx
│       │   index.css
│       │   main.jsx
│       │
│       ├───components
│       │       CreatePostDialog.jsx
│       │       Navbar.jsx
│       │       PostCard.jsx
│       │       Stories.jsx
│       │
│       └───pages
│               AuthPage.jsx
│               HomePage.jsx
│               not-found.jsx
│
├───script
│       build.js
│
├───server
│       db.js
│       index.js
│       models.js
│       routes.js
│       static.js
│       storage.js
│       vite.js
```

## Code Documentation

### package.json
```json
{
  "name": "insta-clone-feed",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx server/index.js",
    "build": "tsx script/build.js",
    "start": "cross-env NODE_ENV=production node dist/index.cjs"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.60.5",
    "clsx": "^2.1.1",
    "connect-mongo": "^6.0.0",
    "dotenv": "^17.3.1",
    "express": "^5.0.1",
    "express-session": "^1.18.1",
    "lucide-react": "^0.453.0",
    "mongoose": "^9.2.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.6.0",
    "wouter": "^3.3.5",
    "ws": "^8.18.0",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/express-session": "^1.18.0",
    "@types/node": "20.19.27",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@types/ws": "^8.5.13",
    "@vitejs/plugin-react": "^4.7.0",
    "autoprefixer": "^10.4.20",
    "cross-env": "^10.1.0",
    "esbuild": "^0.25.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.21.0",
    "vite": "^7.3.0"
  }
}
```

### client/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fira+Code:wght@300..700&family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Outfit:wght@100..900&family=Oxanium:wght@200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### client/src/App.jsx
```jsx
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";

import HomePage from "@/pages/HomePage";
import AuthPage from "@/pages/AuthPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>);

}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>);

}

export default App;
```

### client/src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;

    --primary: 0 0% 0%;
    --primary-foreground: 0 0% 100%;

    --secondary: 0 0% 95%;
    --secondary-foreground: 0 0% 0%;

    --muted: 0 0% 95%;
    --muted-foreground: 0 0% 45%;

    --accent: 0 0% 95%;
    --accent-foreground: 0 0% 0%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 86%;
    --input: 0 0% 86%;
    --ring: 0 0% 0%;

    --radius: 0.5rem;

    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .dark {
    --background: 0 0% 4%;
    --foreground: 0 0% 98%;

    --card: 0 0% 4%;
    --card-foreground: 0 0% 98%;

    --popover: 0 0% 4%;
    --popover-foreground: 0 0% 98%;

    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;

    --secondary: 0 0% 15%;
    --secondary-foreground: 0 0% 98%;

    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 64%;

    --accent: 0 0% 15%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 62% 30%;
    --destructive-foreground: 0 0% 98%;

    --border: 0 0% 15%;
    --input: 0 0% 15%;
    --ring: 0 0% 83%;
  }
}

@layer base {
  * {
    @apply border-gray-300;
  }
  body {
    @apply bg-white text-black antialiased;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply tracking-tight;
  }
}

@layer utilities {
  .font-logo {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  
  /* Hide scrollbar for stories */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Instagram-specific styles */
  .bg-background {
    background-color: white;
  }
  
  .bg-card {
    background-color: white;
  }
  
  .text-muted-foreground {
    color: #737373;
  }
  
  .border-border {
    border-color: #dbdbdb;
  }
}
```

### client/src/main.jsx
```jsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(<App />);
```

### client/src/components/CreatePostDialog.jsx
```jsx
import { useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useCreatePost } from "@/hooks/use-posts";




export function CreatePostDialog({ open, onOpenChange }) {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const { mutate: createPost, isPending } = useCreatePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image.trim()) return;

    createPost(
      { image, caption },
      {
        onSuccess: () => {
          setImage("");
          setCaption("");
          onOpenChange(false);
        }
      }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background w-full max-w-[425px] rounded-xl shadow-lg border relative flex flex-col pt-3 pb-6 px-6">
        <button 
          onClick={() => onOpenChange(false)} 
          className="absolute right-4 top-4 hover:opacity-50 transition-opacity"
        >
          <X className="w-5 h-5"/>
        </button>
        <div className="text-center pb-3 border-b border-border/50 mb-4">
          <h2 className="font-semibold text-lg">Create new post</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {image ?
          <div className="relative aspect-square w-full rounded-md overflow-hidden bg-muted flex items-center justify-center border border-border/50">
              <img
              src={image}
              alt="Preview"
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x600?text=Invalid+Image+URL';
              }} />
            
            </div> :

          <div className="aspect-square w-full rounded-md bg-muted flex flex-col items-center justify-center border-2 border-dashed border-border/50 text-muted-foreground">
              <ImagePlus className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-sm">Enter an image URL below to preview</p>
            </div>
          }

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-sm font-semibold">Image URL</label>
              <input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full text-[14px] bg-muted/50 border border-border rounded-sm py-2 px-3 focus:outline-none"
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="caption" className="text-sm font-semibold">Caption</label>
              <textarea
                id="caption"
                placeholder="Write a caption..."
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)} />
              
            </div>
          </div>

          <button 
             type="submit" 
             className="w-full font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg h-9 flex items-center justify-center transition-colors disabled:opacity-50" 
             disabled={isPending || !image.trim()}>
            {isPending ?
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sharing...</> :

            "Share"
            }
          </button>
        </form>
      </div>
    </div>);

}
```

### client/src/components/PostCard.jsx
```jsx
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
```

### client/src/components/Stories.jsx
```jsx
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
```

### client/src/pages/AuthPage.jsx
```jsx
import { useState } from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Heart, MessageCircle, Send, Bookmark, Plus, MoreHorizontal } from "lucide-react";

const InstagramLogo = () => (
  <div className="w-[175px] h-[51px] flex items-center justify-center">
    <svg 
      aria-label="Instagram" 
      className="w-full h-full" 
      fill="currentColor" 
      viewBox="0 0 200 60" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <text 
        x="0" 
        y="45" 
        fontFamily="Instagram Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
        fontSize="40" 
        fontWeight="500"
        fill="#262626"
      >
        Instagram
      </text>
    </svg>
  </div>
);

const CleanPhoneMockup = () => (
  <div className="relative">
    {/* Main Phone */}
    <div className="w-[250px] h-[500px] bg-white rounded-[2rem] shadow-2xl border border-gray-200 overflow-hidden">
      {/* Status Bar */}
      <div className="bg-white px-6 py-2 flex justify-between items-center text-xs border-b border-gray-100">
        <span className="font-medium">9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-3 border border-gray-800 rounded-sm"></div>
          <div className="w-1 h-3 bg-gray-800 rounded-sm"></div>
          <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
        </div>
      </div>
      
      {/* Instagram App */}
      <div className="bg-white h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="text-xl font-semibold">Instagram</div>
          <div className="flex gap-3">
            <Heart className="w-6 h-6" />
            <MessageCircle className="w-6 h-6" />
          </div>
        </div>
        
        {/* Stories */}
        <div className="flex gap-2 px-4 py-3 border-b border-gray-100">
          <div className="w-14 h-14 bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-500 rounded-full p-0.5">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
          </div>
          {[1,2,3,4].map(i => (
            <div key={i} className="w-14 h-14 bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-500 rounded-full p-0.5">
              <div className="w-full h-full bg-white rounded-full"></div>
            </div>
          ))}
        </div>
        
        {/* Post */}
        <div className="border-b border-gray-100">
          {/* Post Header */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full"></div>
              <span className="text-sm font-semibold">johndoe</span>
            </div>
            <MoreHorizontal className="w-5 h-5" />
          </div>
          
          {/* Post Image */}
          <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100"></div>
          
          {/* Post Actions */}
          <div className="p-3">
            <div className="flex gap-4 mb-2">
              <Heart className="w-6 h-6" />
              <MessageCircle className="w-6 h-6" />
              <Send className="w-6 h-6 transform -rotate-12" />
              <Bookmark className="w-6 h-6 ml-auto" />
            </div>
            <div className="text-sm font-semibold mb-1">1,234 likes</div>
            <div className="text-sm">
              <span className="font-semibold">johndoe</span> Beautiful sunset 🌅
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function AuthPage() {
  const { user, login, signup, isLoggingIn, isSigningUp, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>);
  }

  if (user) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login({ email, password });
    } else {
      signup({ email, password, username });
    }
  };

  const isPending = isLoggingIn || isSigningUp;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="flex w-full max-w-[800px] items-center justify-center gap-16">
        
        {/* Clean Phone Mockup */}
        <div className="hidden lg:block">
          <CleanPhoneMockup />
        </div>

        {/* Clean Auth Form */}
        <div className="w-full max-w-[350px]">
          <div className="bg-white border border-gray-300 rounded-sm p-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <InstagramLogo />
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Phone number, username, or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm rounded focus:outline-none focus:border-gray-400"
                required />
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-sm rounded focus:outline-none focus:border-gray-400"
                required />
              
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded text-sm transition-colors disabled:opacity-50"
                disabled={isPending || !email || !password}>
                
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />}
                Log in
              </button>
            </form>

            {/* OR Divider */}
            <div className="flex items-center w-full my-6">
              <div className="h-px bg-gray-300 flex-1"></div>
              <span className="text-gray-500 text-xs uppercase font-semibold px-4">OR</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            {/* Facebook Login */}
            <button className="w-full flex items-center justify-center text-blue-600 text-sm font-semibold hover:opacity-70 transition-opacity">
              <svg className="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Log in with Facebook
            </button>
          </div>

          {/* Signup Link */}
          <div className="bg-white border border-gray-300 rounded-sm p-4 text-center mt-3">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 hover:text-blue-900 font-semibold transition-colors">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>);
}
```

### client/src/pages/HomePage.jsx
```jsx
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
```

### client/src/pages/not-found.jsx
```jsx

import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-4 bg-white border rounded-xl shadow-sm p-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
      </div>
    </div>);

}
```

### script/build.js
```js
import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
"connect-mongo",
"dotenv",
"express",
"express-session",
"mongoose",
"ws",
"zod"];


async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {})];

  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.js"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '""'
    },
    minify: true,
    external: externals,
    logLevel: "info"
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### server/db.js
```js
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = "mongodb://localhost:27017/insta-clone";
}

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }
};
```

### server/index.js
```js
import express from "express";
import { registerRoutes } from "./routes.js";
import { serveStatic } from "./static.js";
import { createServer } from "http";
import { connectDB } from "./db.js";

const app = express();
const httpServer = createServer(app);







app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  })
);

app.use(express.urlencoded({ extended: false }));

export function log(message, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await connectDB();
  await registerRoutes(httpServer, app);

  app.use((err, _req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0"
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
```

### server/models.js
```js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  profileImage: { type: String, required: true },
  image: { type: String, required: true },
  caption: { type: String, required: true },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export const Post = mongoose.model('Post', postSchema);

```

### server/routes.js
```js


import { storage, setupSession } from "./storage.js";
import { api } from "../shared/routes.js";
import { z } from "zod";

// Mock user creation for initial testing if db is empty
async function seedDatabase() {
  try {
    const existingPosts = await storage.getPosts();
    if (existingPosts && existingPosts.length > 0) return; // DB already has posts

    // Force create mock users if they don't exist
    let user1 = await storage.getUserByUsername("travelr_mike");
    if (!user1) {
      user1 = await storage.createUser({
        username: "travelr_mike",
        email: "mike@example.com",
        password: "password123" 
      });
    }

    let user2 = await storage.getUserByUsername("jessicavibes");
    if (!user2) {
      user2 = await storage.createUser({
        username: "jessicavibes",
        email: "jess@example.com",
        password: "password123"
      });
    }

    let user3 = await storage.getUserByUsername("nature.lover");
    if (!user3) {
      user3 = await storage.createUser({
        username: "nature.lover",
        email: "nature@example.com",
        password: "password123"
      });
    }

    // Seed realistic detailed mock posts
    await storage.createPost(user1._id, {
      image: "https://images.unsplash.com/photo-1506744626753-eda8151a7471?w=800&auto=format&fit=crop",
      caption: "Nothing beats a calm morning by the lake. This view never gets old! 🌲🚣‍♂️ #nature #outdoors #hiking"
    });

    await storage.createPost(user2._id, {
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop",
      caption: "Late night cravings satisfied ☕ Which one are you picking? #coffee #latteart #cafe"
    });

    await storage.createPost(user3._id, {
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop",
      caption: "Into the woods we go... 🌲 Finding peace in the simplest things. #exploration #peaceful #forest"
    });

    console.log("Mock database successfully seeded with 3 realistic posts!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

export async function registerRoutes(
httpServer,
app)
{
  // Setup session for auth
  setupSession(app);

  app.post(api.auth.signup.path, async (req, res) => {
    try {
      const input = api.auth.signup.input.parse(req.body);

      const existingUser = await storage.getUserByUsername(input.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(input.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createUser(input);

      // Store user id in session
      req.session.userId = user._id;

      res.status(201).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.')
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.auth.login.path, async (req, res) => {
    try {
      const input = api.auth.login.input.parse(req.body);

      const user = await storage.getUserByEmail(input.email);

      // Basic mock authentication check
      if (!user || user.password !== input.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      req.session.userId = user._id;
      res.status(200).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.')
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  app.get(api.auth.me.path, async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json(user);
  });

  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.status(200).json(posts);
  });

  app.post(api.posts.create.path, async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const input = api.posts.create.input.parse(req.body);
      const post = await storage.createPost(userId, input);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.')
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.posts.like.path, async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await storage.likePost(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  });

  // Call seed database after routes are registered
  seedDatabase().catch(console.error);

  return httpServer;
}
```

### server/static.js
```js
import express from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
```

### server/storage.js
```js
import session from "express-session";
import MongoStore from "connect-mongo";
import { User, Post } from "./models.js";

export function setupSession(app) {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/insta-clone"
      }),
      secret: process.env.SESSION_SECRET || "instagram_clone_secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: app.get("env") === "production",
      },
    })
  );
}

export class DatabaseStorage {
  async getUser(id) {
    return await User.findById(id).lean();
  }

  async getUserByUsername(username) {
    return await User.findOne({ username }).lean();
  }

  async getUserByEmail(email) {
    return await User.findOne({ email }).lean();
  }

  async createUser(insertUser) {
    const user = new User(insertUser);
    await user.save();
    return user.toObject();
  }

  async getPosts() {
    return await Post.find().sort({ createdAt: -1 }).lean();
  }

  async createPost(userId, post) {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");
    
    const newPost = new Post({
      userId,
      username: user.username,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
      image: post.image,
      caption: post.caption,
    });
    
    await newPost.save();
    return newPost.toObject();
  }

  async likePost(postId) {
    const post = await Post.findById(postId);
    if (!post) return undefined;
    
    post.likes += 1;
    await post.save();
    return post.toObject();
  }
}

export const storage = new DatabaseStorage();
```

### server/vite.js
```js

import { createServer as createViteServer, createLogger } from "vite";

import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export async function setupVite(server, app) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });

  app.use(vite.middlewares);

  app.use("/{*path}", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
```
