import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogForm } from "@/components/admin/blog-form";
import { prisma } from "@/lib/prisma";

export default async function NewBlogPage() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        <p className="text-muted-foreground">Write and publish a new blog post</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogForm categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
