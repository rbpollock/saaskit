import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
    <div className="min-h-screen overflow-x-hidden bg-[#E5DBCF] text-[#1f1b18]">
      <Navbar />

      <main className="pt-28">
        <section className="pb-12 pt-6 md:pt-10">
          <div className="container px-4 md:px-6">
            <div className="rounded-[2.2rem] border border-[#b8ab9c] bg-[#efe6dc] p-6 shadow-[0_30px_80px_-40px_rgba(31,27,24,0.45)] md:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#b8ab9c] bg-[#e5dbcf] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#61584f]">
                    <BookOpen className="h-3.5 w-3.5" />
                    Journal
                  </div>
                  <div className="space-y-5">
                    <p className="text-sm uppercase tracking-[0.34em] text-[#73685e]">
                      Product notes and announcements
                    </p>
                    <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                      A quieter editorial surface for updates, guides, and release notes.
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-[#4f4942] md:text-xl">
                      The blog now matches the premium neutral system instead of the older gradient-heavy marketing treatment.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-6 text-[#f3eadf] md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#b7a995]">
                    Reading lanes
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "Product announcements and roadmap notes",
                      "Technical walkthroughs and implementation guides",
                      "Operational updates for customers and teams",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.25rem] border border-[#3b342e] bg-[#26211d] px-4 py-3 text-sm text-[#efe5da]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24 pt-8">
          <div className="container px-4 md:px-6">
            {blogs.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                {blogs.map((blog: any) => (
                  <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block">
                    <article className="h-full overflow-hidden rounded-[2rem] border border-[#c7b8aa] bg-[#f4ede5] transition-all hover:-translate-y-1 hover:border-[#8c7e71] hover:shadow-[0_24px_50px_-38px_rgba(31,27,24,0.45)]">
                      {blog.featuredImage && (
                        <div
                          className="h-52 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                          style={{ backgroundImage: `url(${blog.featuredImage})` }}
                        />
                      )}
                      <div className="p-6">
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

                        <h2 className="text-2xl font-semibold leading-tight text-[#1f1b18] transition-colors group-hover:text-[#5e544b]">
                          {blog.title}
                        </h2>
                        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#5a524a]">
                          {blog.excerpt}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#6c6258]">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{blog.author.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{blog.publishedAt && formatDate(blog.publishedAt)}</span>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#1f1b18]">
                          Read post
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#c7b8aa] bg-[#f4ede5] p-12 text-center">
                <BookOpen className="mx-auto h-14 w-14 text-[#7a6f65]" />
                <h2 className="mt-6 text-3xl font-semibold text-[#1f1b18]">
                  No posts yet
                </h2>
                <p className="mt-3 text-base leading-7 text-[#5a524a]">
                  This section is ready for release notes, guides, and product updates.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
