import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";
import { DeleteBlogButton } from "@/components/admin/delete-blog-button";

export default async function BlogManagementPage() {
  const blogs = await prisma.blog.findMany({
    include: {
      author: true,
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const stats = {
    total: blogs.length,
    published: blogs.filter((b) => b.published).length,
    draft: blogs.filter((b) => !b.published).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>Manage your blog content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Author</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Views</th>
                  <th className="text-left p-2">Published</th>
                  <th className="text-right p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div>
                        <p className="font-medium">{blog.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                          {blog.excerpt || blog.content.substring(0, 100)}
                        </p>
                      </div>
                    </td>
                    <td className="p-2">
                      <p className="text-sm">{blog.author.name || blog.author.email}</p>
                    </td>
                    <td className="p-2">
                      {blog.category ? (
                        <Badge variant="outline">{blog.category.name}</Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">Uncategorized</span>
                      )}
                    </td>
                    <td className="p-2">
                      <Badge variant={blog.published ? "default" : "secondary"}>
                        {blog.published ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="p-2 font-mono text-sm">{blog.views}</td>
                    <td className="p-2 text-sm">
                      {blog.publishedAt ? format(new Date(blog.publishedAt), "MMM d, yyyy") : "Not published"}
                    </td>
                    <td className="p-2">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/blog/${blog.id}`}>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteBlogButton blogId={blog.id} blogTitle={blog.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {blogs.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No blog posts yet. Create your first post!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
