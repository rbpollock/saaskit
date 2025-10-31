import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    include: {
      author: true,
      categories: {
        include: { category: true },
      },
    },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Latest news and updates
          </p>
        </div>

        {blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`}>
                <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                  {blog.featuredImage && (
                    <div
                      className="h-48 bg-cover bg-center rounded-t-lg"
                      style={{ backgroundImage: `url(${blog.featuredImage})` }}
                    />
                  )}
                  <CardHeader>
                    <div className="flex gap-2 mb-2">
                      {blog.categories.map((cat) => (
                        <Badge key={cat.categoryId} variant="secondary">
                          {cat.category.name}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {blog.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{blog.author.name}</span>
                      <span>
                        {blog.publishedAt && formatDate(blog.publishedAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
