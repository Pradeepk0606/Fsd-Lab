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