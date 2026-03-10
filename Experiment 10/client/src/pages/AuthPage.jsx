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