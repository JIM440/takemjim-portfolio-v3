import { BlogEditor } from "@/components/admin/blog-editor";

export default function AdminBlogNewPage() {
  return (
    <div>
      <h1 className="admin-h1">New blog post</h1>
      <BlogEditor mode="new" />
    </div>
  );
}
