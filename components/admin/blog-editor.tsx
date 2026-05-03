"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useRef } from "react";
import { slugify } from "@/lib/slugify";
import { TiptapEditor } from "@/components/admin/tiptap-editor";
import { AppPhoto } from "@/components/landing/app-photo";
import type { BlogPost } from "@/lib/data-store";

type BlogEditorProps = {
  mode: "new" | "edit";
  initial?: BlogPost;
};

export function BlogEditor({ mode, initial }: BlogEditorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [bodyHtml, setBodyHtml] = useState(initial?.bodyHtml ?? "<p></p>");
  const [image, setImage] = useState(initial?.image ?? "");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const editorKey = useMemo(() => initial?.id ?? "new-post", [initial?.id]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImage(data.url);
      } else {
        setError("Failed to upload cover image");
      }
    } catch (err) {
      setError("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  }

  async function onSave() {
    if (!title.trim() || !excerpt.trim() || !category.trim() || bodyHtml === "<p></p>") {
      setError("Fill in title, excerpt, category, and body before saving.");
      return;
    }

    setIsSaving(true);
    setError("");

    const postData = {
      title: title.trim(),
      slug: initial?.slug || slugify(title) || `post-${Date.now()}`,
      excerpt: excerpt.trim(),
      category: category.trim(),
      bodyHtml,
      image: image.trim() || undefined,
    };

    try {
      const url = mode === "new" ? "/api/admin/blogs" : `/api/admin/blogs/${initial?.id}`;
      const method = mode === "new" ? "POST" : "PUT";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        router.push(`/admin/blog?refresh=${Date.now()}`);
        router.refresh();
      } else {
        const json = await res.json();
        setError(json.error || "Failed to save post");
      }
    } catch (err) {
      setError("Network error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="admin-blog-editor min-w-0 space-y-8 sm:space-y-10">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,20rem)] lg:gap-10">
        {/* Main Fields */}
        <div className="min-w-0 space-y-8">
          <label className="admin-field">
            <span className="admin-field__label text-xs uppercase tracking-widest opacity-60">Post Title</span>
            <input 
              className="admin-field__input text-xl font-medium py-4" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter a compelling title..." 
            />
          </label>
          
          <label className="admin-field">
            <span className="admin-field__label text-xs uppercase tracking-widest opacity-60">Excerpt / SEO Description</span>
            <textarea
              className="admin-field__input min-h-[100px] py-4 text-sm leading-relaxed"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary that appears in cards and search results..."
            />
          </label>

          <div>
            <p className="admin-field__label text-xs uppercase tracking-widest opacity-60 mb-3">Article Body</p>
            <TiptapEditor
              key={editorKey}
              initialHtml={bodyHtml}
              onChange={setBodyHtml}
              placeholder="Share your expertise... format your text and upload images directly."
            />
          </div>
        </div>

        {/* Sidebar / Meta */}
        <div className="min-w-0 space-y-8">
          <div className="admin-panel space-y-6 p-4 sm:p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--muted-label)]">Publishing Details</h3>
            
            <label className="admin-field">
              <span className="admin-field__label text-[10px] uppercase tracking-widest">Category</span>
              <input 
                className="admin-field__input text-xs" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                placeholder="AI, Engineering, etc."
              />
            </label>

            <div className="space-y-4">
              <p className="admin-field__label text-[10px] uppercase tracking-widest">Featured Image</p>
              
              {/* Preview Area */}
              <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-muted)]">
                {image ? (
                  <AppPhoto 
                    src={image} 
                    alt="Preview" 
                    className="h-full w-full"
                    imgClassName="absolute inset-0 h-full w-full object-cover" 
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-center p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[color:var(--muted-label)]">No image selected</p>
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest animate-pulse">Uploading...</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <input 
                  className="admin-field__input text-[10px] font-mono" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  placeholder="URL or upload below" 
                />
                <button 
                  type="button" 
                  className="admin-btn admin-btn--ghost w-full py-2 text-[10px] font-bold uppercase tracking-widest"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? "Processing..." : "Select File"}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="button" 
              className="admin-btn admin-btn--primary w-full py-4 text-xs font-bold uppercase tracking-widest disabled:opacity-50" 
              onClick={onSave}
              disabled={isSaving || isUploading}
            >
              {isSaving ? "Saving Post..." : "Publish Post"}
            </button>
            <button 
              type="button" 
              className="admin-btn admin-btn--ghost w-full py-3 text-xs font-bold uppercase tracking-widest" 
              onClick={() => router.back()}
            >
              Discard
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30">
          <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : null}
    </div>
  );
}
