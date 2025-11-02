import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      author: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!blog || !blog.published) {
    notFound();
  }

  // Increment view count
  await prisma.blog.update({
    where: { id: blog.id },
    data: { views: { increment: 1 } },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div
            className="w-full h-96 bg-cover bg-center rounded-lg mb-8"
            style={{ backgroundImage: `url(${blog.featuredImage})` }}
          />
        )}

        {/* Categories */}
        {blog.categories.length > 0 && (
          <div className="flex gap-2 mb-4">
            {blog.categories.map((cat) => (
              <Badge key={cat.categoryId} variant="secondary">
                {cat.category.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-muted-foreground mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            {blog.author.image && (
              <img
                src={blog.author.image}
                alt={blog.author.name || "Author"}
                className="w-10 h-10 rounded-full"
              />
            )}
            <span className="font-medium">{blog.author.name || "Anonymous"}</span>
          </div>
          <span>•</span>
          <span>{blog.publishedAt && formatDate(blog.publishedAt)}</span>
          <span>•</span>
          <span>{blog.views} views</span>
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap">{blog.content}</div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Written by</p>
              <div className="flex items-center gap-2">
                {blog.author.image && (
                  <img
                    src={blog.author.image}
                    alt={blog.author.name || "Author"}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium">{blog.author.name || "Anonymous"}</p>
                  <p className="text-sm text-muted-foreground">{blog.author.email}</p>
                </div>
              </div>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center text-primary hover:underline"
            >
              View all posts
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
