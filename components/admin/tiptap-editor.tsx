"use client";

import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import ImageExtension from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef } from "react";

type TiptapEditorProps = {
  initialHtml: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export function TiptapEditor({ initialHtml, onChange, placeholder }: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Write the article body...",
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      ImageExtension.configure({
        allowBase64: true,
      }),
    ],
    content: initialHtml,
    editorProps: {
      attributes: {
        class: "admin-tiptap__inner prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[320px] sm:min-h-[400px]",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        editor.chain().focus().setImage({ src: data.url }).run();
      } else {
        alert("Failed to upload image");
      }
    } catch (err) {
      alert("Error uploading image");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  if (!editor) {
    return (
      <div className="admin-tiptap admin-tiptap--loading rounded-[1.35rem] border border-[color:var(--line)] bg-[color:var(--bg-muted)] p-6 text-sm text-[color:var(--muted)]">
        Loading editor…
      </div>
    );
  }

  const MenuButton = ({ 
    onClick, 
    active = false, 
    children 
  }: { 
    onClick: () => void; 
    active?: boolean; 
    children: React.ReactNode 
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`admin-btn admin-btn--ghost h-9 min-w-[36px] px-2 text-xs font-medium ${active ? "bg-[color:var(--accent-soft)] ring-1 ring-[color:var(--line-strong)]" : ""}`}
    >
      {children}
    </button>
  );

  return (
    <div className="admin-tiptap overflow-hidden rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] sm:rounded-[1.5rem]">
      <div className="flex max-w-full items-center gap-1 overflow-x-auto border-b border-[color:var(--line)] bg-[color:var(--bg-muted)] p-2 sm:flex-wrap">
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          B
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          I
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        >
          S
        </MenuButton>
        
        <div className="mx-1 h-4 w-px bg-[color:var(--line)]" />

        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
        >
          H2
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
        >
          H3
        </MenuButton>

        <div className="mx-1 h-4 w-px bg-[color:var(--line)]" />

        <MenuButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          List
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          1.
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          &quot;
        </MenuButton>

        <div className="mx-1 h-4 w-px bg-[color:var(--line)]" />

        <MenuButton
          onClick={() => {
            const href = window.prompt("Paste the link URL", editor.getAttributes("link").href || "");
            if (href === null) return;
            if (href === "") {
              editor.chain().focus().unsetLink().run();
            } else {
              editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
            }
          }}
          active={editor.isActive("link")}
        >
          Link
        </MenuButton>

        <MenuButton onClick={() => fileInputRef.current?.click()}>
          Img
        </MenuButton>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileUpload} 
        />
        
        <MenuButton onClick={() => {
          const src = window.prompt("Image URL");
          if (src) editor.chain().focus().setImage({ src }).run();
        }}>
          URL Img
        </MenuButton>

        <div className="flex-1" />

        <MenuButton onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </MenuButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
