import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Eye, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return blogs.map((blog: any) => ({
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

  await prisma.blog.update({
    where: { id: blog.id },
    data: { views: { increment: 1 } },
  });

  return (
    <div className="min-h-screen bg-[#E5DBCF] text-[#1f1b18]">
      <Navbar />

      <main className="pt-28">
        <section className="pb-12 pt-6 md:pt-10">
          <div className="container px-4 md:px-6">
            <div className="rounded-[2.2rem] border border-[#b8ab9c] bg-[#efe6dc] p-6 shadow-[0_30px_80px_-40px_rgba(31,27,24,0.45)] md:p-10">
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="mb-8 rounded-full border-[#6b6259] bg-transparent px-6 text-[#1f1b18] hover:bg-[#ddd2c6] hover:text-[#1f1b18]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to blog
                </Button>
              </Link>

              {blog.categories.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {blog.categories.map((cat: any) => (
                    <Badge
                      key={cat.categoryId}
                      className="rounded-full border border-[#c7b8aa] bg-[#e5dbcf] px-3 py-1 text-[#5f564d] hover:bg-[#ddd2c6]"
                    >
                      {cat.category.name}
                    </Badge>
                  ))}
                </div>
              )}

              <h1 className="font-display max-w-4xl text-4xl leading-tight sm:text-5xl md:text-6xl">
                {blog.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#6c6258]">
                <div className="flex items-center gap-2">
                  {blog.author.image ? (
                    <img
                      src={blog.author.image}
                      alt={blog.author.name || "Author"}
                      className="h-10 w-10 rounded-full border border-[#baad9f] object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f1b18] text-[#f3eadf]">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                  <span>{blog.author.name || "Anonymous"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{blog.publishedAt && formatDate(blog.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{blog.views} views</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {blog.featuredImage && (
          <section className="pb-12">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#c7b8aa] shadow-[0_24px_50px_-38px_rgba(31,27,24,0.45)]">
                <div
                  className="h-72 w-full bg-cover bg-center md:h-96"
                  style={{ backgroundImage: `url(${blog.featuredImage})` }}
                />
              </div>
            </div>
          </section>
        )}

        <article className="pb-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              {blog.excerpt && (
                <div className="mb-10 rounded-[1.8rem] border border-[#c7b8aa] bg-[#f4ede5] p-8">
                  <p className="text-lg leading-8 text-[#4f4942]">{blog.excerpt}</p>
                </div>
              )}

              <div className="rounded-[2rem] border border-[#c7b8aa] bg-[#f7f1e9] p-8 shadow-[0_24px_50px_-42px_rgba(31,27,24,0.35)] md:p-10">
                <div className="whitespace-pre-wrap text-base leading-8 text-[#3b342e]">
                  {blog.content}
                </div>
              </div>

              <div className="mt-10 rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-7 text-[#f3eadf]">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b7a995]">
                  Written by
                </p>
                <div className="mt-5 flex items-center gap-4">
                  {blog.author.image ? (
                    <img
                      src={blog.author.image}
                      alt={blog.author.name || "Author"}
                      className="h-16 w-16 rounded-full border border-[#4c443d] object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#314337]">
                      <User className="h-7 w-7" />
                    </div>
                  )}
                  <div>
                    <p className="text-xl font-semibold">{blog.author.name || "Anonymous"}</p>
                    <p className="text-sm text-[#cbbdad]">{blog.author.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <Link href="/blog">
                  <Button className="h-14 rounded-full bg-[#1f1b18] px-8 text-base font-semibold text-[#f3eadf] hover:bg-[#312a25]">
                    View all posts
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
