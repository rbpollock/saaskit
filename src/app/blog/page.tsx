import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";

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
    <div className="light min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-medium text-white">
              <BookOpen className="h-4 w-4" />
              <span>Blog & News</span>
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              Latest Updates & Insights
            </h1>
            <p className="text-xl text-purple-100 md:text-2xl">
              Stay up to date with the latest news, tutorials, and announcements from our team.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 70C120 60 240 40 360 33.3C480 26.7 600 33.3 720 40C840 46.7 960 53.3 1080 50C1200 46.7 1320 33.3 1380 26.7L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogs.map((blog: any) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <article className="group h-full rounded-3xl border-2 border-gray-200 bg-white overflow-hidden transition-all hover:border-purple-500 hover:shadow-2xl hover:-translate-y-2">
                    {blog.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform group-hover:scale-110"
                          style={{ backgroundImage: `url(${blog.featuredImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {blog.categories.map((cat: any) => (
                          <Badge
                            key={cat.categoryId}
                            className="rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 font-semibold"
                          >
                            {cat.category.name}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="mb-3 text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {blog.title}
                      </h2>
                      <p className="mb-4 text-gray-600 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{blog.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{blog.publishedAt && formatDate(blog.publishedAt)}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-purple-600 font-bold group-hover:gap-3 transition-all">
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-3xl border-2 border-gray-200 bg-white p-12 text-center">
                <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                <h3 className="mb-2 text-2xl font-bold text-gray-900">No blog posts yet</h3>
                <p className="text-gray-600">Check back soon for new content!</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
