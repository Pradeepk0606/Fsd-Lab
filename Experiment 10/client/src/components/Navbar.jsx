import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Home, Search, PlusSquare, Compass, Heart, MessageCircle, Menu, Settings, LogOut, ChevronUp } from "lucide-react";
import { CreatePostDialog } from "./CreatePostDialog";

const InstagramTextLogo = ({ className }) => (
  <div className={className}>
    <svg 
      aria-label="Instagram" 
      className="w-[103px] h-[29px]" 
      fill="currentColor" 
      viewBox="0 0 103 29" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <text 
        x="0" 
        y="24" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
        fontSize="29" 
        fontWeight="500"
        fill="#262626"
      >
        Instagram
      </text>
    </svg>
  </div>
);

const InstagramIconLogo = ({ className }) => (
  <svg 
    aria-label="Instagram" 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
  </svg>
);

export function Navbar() {
  const { user, logout } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      {/* Desktop Side Navigation */}
      <nav className="hidden xl:flex fixed top-0 left-0 h-screen w-[244px] flex-col border-r border-gray-200 bg-white py-8 px-3 z-50">
        <div className="flex flex-col h-full">
          <Link href="/" className="mb-10 px-3 cursor-pointer pt-[10px] pb-[16px]">
            <InstagramTextLogo className="hidden xl:block" />
          </Link>

          <div className="flex-1 space-y-2">
            <Link href="/" className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors w-full cursor-pointer group">
              <Home className="w-6 h-6 group-hover:scale-105 transition-transform" />
              <span className="hidden xl:block text-[16px] font-semibold">Home</span>
            </Link>
            
            <button className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors w-full cursor-pointer group">
              <Search className="w-6 h-6 group-hover:scale-105 transition-transform" />
              <span className="hidden xl:block text-[16px]">Search</span>
            </button>
            
            <button className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors w-full cursor-pointer group">
              <Compass className="w-6 h-6 group-hover:scale-105 transition-transform" />
              <span className="hidden xl:block text-[16px]">Explore</span>
            </button>

            <button className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors w-full cursor-pointer group">
              <MessageCircle className="w-6 h-6 group-hover:scale-105 transition-transform" />
              <span className="hidden xl:block text-[16px]">Messages</span>
            </button>

            <button className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors w-full cursor-pointer group">
              <Heart className="w-6 h-6 group-hover:scale-105 transition-transform" />
              <span className="hidden xl:block text-[16px]">Notifications</span>
            </button>

            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors w-full cursor-pointer group">
              <PlusSquare className="w-6 h-6 group-hover:scale-105 transition-transform" />
              <span className="hidden xl:block text-[16px]">Create</span>
            </button>

            <button className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors w-full cursor-pointer group">
              <img 
                 src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} 
                 alt={`${user.username} profile`}
                 className="w-6 h-6 rounded-full bg-gray-200 object-cover group-hover:scale-105 transition-transform" 
              />
              <span className="hidden xl:block text-[16px] font-semibold">Profile</span>
            </button>
          </div>

          <div className="mt-auto relative">
             <button 
               onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
               className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors w-full cursor-pointer group text-gray-700">
               <Menu className="w-6 h-6 group-hover:scale-105 transition-transform" />
               <span className="hidden xl:block text-[16px]">More</span>
             </button>

             {/* Dropdown Menu */}
             {isMoreMenuOpen && (
               <div className="absolute bottom-full left-0 mb-2 w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                 <button 
                   onClick={() => {
                     setIsMoreMenuOpen(false);
                     // Settings functionality can be added here
                   }}
                   className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700">
                   <Settings className="w-5 h-5" />
                   <span className="text-sm">Settings</span>
                 </button>
                 <button 
                   onClick={() => {
                     setIsMoreMenuOpen(false);
                     logout();
                   }}
                   className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700">
                   <LogOut className="w-5 h-5" />
                   <span className="text-sm">Log out</span>
                 </button>
               </div>
             )}
          </div>
        </div>
      </nav>

      {/* Desktop Side Navigation - Collapsed (Tablet/MD) */}
      <nav className="hidden md:flex xl:hidden fixed top-0 left-0 h-screen w-[72px] flex-col border-r border-gray-200 bg-white py-8 px-3 z-50 items-center">
         <div className="flex flex-col h-full w-full">
          <Link href="/" className="mb-10 w-full flex justify-center cursor-pointer pt-[20px] pb-[16px]">
             <InstagramIconLogo className="h-6 w-6" />
          </Link>
          <div className="flex-1 space-y-4 w-full flex flex-col items-center">
              <Link href="/" className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group"><Home className="w-6 h-6 group-hover:scale-105 transition-transform" /></Link>
              <button className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group"><Search className="w-6 h-6 group-hover:scale-105 transition-transform" /></button>
              <button className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group"><Compass className="w-6 h-6 group-hover:scale-105 transition-transform" /></button>
              <button className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group"><MessageCircle className="w-6 h-6 group-hover:scale-105 transition-transform" /></button>
              <button className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group"><Heart className="w-6 h-6 group-hover:scale-105 transition-transform" /></button>
              <button onClick={() => setIsCreateOpen(true)} className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group"><PlusSquare className="w-6 h-6 group-hover:scale-105 transition-transform" /></button>
              <button className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group">
                <img 
                   src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} 
                   alt={`${user.username} profile`}
                   className="w-6 h-6 rounded-full bg-gray-200 object-cover group-hover:scale-105 transition-transform" 
                />
              </button>
          </div>
          <div className="mt-auto w-full flex justify-center relative">
             <button 
               onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
               className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer group text-gray-700">
               <Menu className="w-6 h-6 group-hover:scale-105 transition-transform" />
             </button>

             {/* Collapsed Dropdown Menu */}
             {isMoreMenuOpen && (
               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                 <button 
                   onClick={() => {
                     setIsMoreMenuOpen(false);
                     // Settings functionality can be added here
                   }}
                   className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700">
                   <Settings className="w-5 h-5" />
                   <span className="text-sm">Settings</span>
                 </button>
                 <button 
                   onClick={() => {
                     setIsMoreMenuOpen(false);
                     logout();
                   }}
                   className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700">
                   <LogOut className="w-5 h-5" />
                   <span className="text-sm">Log out</span>
                 </button>
               </div>
             )}
          </div>
         </div>
      </nav>

      {/* Mobile Top Navigation (Logo only) */}
      <nav className="md:hidden fixed top-0 w-full bg-white border-b border-gray-200 z-50 h-11 flex items-center px-4 justify-between">
         <Link href="/" className="cursor-pointer">
            <InstagramTextLogo className="h-[29px]" />
         </Link>
         <div className="flex gap-4">
            <Heart className="w-6 h-6 cursor-pointer" />
            <MessageCircle className="w-6 h-6 cursor-pointer" />
         </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 h-[48px] flex items-center justify-around px-2 pb-1">
        <Link href="/" className="p-2 cursor-pointer">
          <Home className="w-[26px] h-[26px]" />
        </Link>
        
        <button className="p-2 cursor-pointer">
          <Search className="w-[26px] h-[26px]" />
        </button>
        
        <button onClick={() => setIsCreateOpen(true)} className="p-2 cursor-pointer">
          <PlusSquare className="w-[26px] h-[26px]" />
        </button>

        <button className="p-2 cursor-pointer">
           <img 
               src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} 
               alt={`${user.username} profile`}
               className="w-6 h-6 rounded-full bg-gray-200 object-cover" 
           />
        </button>
      </nav>

      {/* Overlay to close dropdown when clicking outside */}
      {isMoreMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}

      <CreatePostDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </>
  );
}