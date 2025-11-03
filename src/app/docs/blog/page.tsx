export default function BlogSystemPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Blog System</h1>
      <p className="lead">
        Built-in blog with categories, SEO optimization, and markdown support for content marketing.
      </p>

      <h2>Overview</h2>
      <p>
        The blog system allows you to create and publish content to attract and engage users. It includes category organization, SEO features, and view tracking.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Create and publish blog posts</li>
        <li>Category organization (many-to-many)</li>
        <li>Draft and published states</li>
        <li>Cover images</li>
        <li>View counter</li>
        <li>Author attribution</li>
        <li>SEO-friendly URLs (slugs)</li>
      </ul>

      <h2>Database Schema</h2>

      <h3>Blog Model</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`model Blog {
  id         String   @id @default(cuid())
  title      String
  slug       String   @unique
  content    String
  excerpt    String?
  featuredImage String?
  published  Boolean  @default(false)
  views      Int      @default(0)
  authorId   String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  author     User            @relation(fields: [authorId], references: [id])
  categories BlogCategory[]
}`}</code>
      </pre>

      <h3>Category Model</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`model Category {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  createdAt   DateTime @default(now())

  blogs BlogCategory[]
}`}</code>
      </pre>

      <h3>Many-to-Many Relationship</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`model BlogCategory {
  id         String   @id @default(cuid())
  blogId     String
  categoryId String
  createdAt  DateTime @default(now())

  blog     Blog     @relation(fields: [blogId], references: [id], onDelete: Cascade)
  category Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@unique([blogId, categoryId])
}`}</code>
      </pre>

      <h2>Creating Blog Posts</h2>

      <h3>Admin Interface</h3>
      <p>At <code>/admin/blog/new</code>:</p>
      <ol>
        <li>Enter title (slug auto-generated)</li>
        <li>Write content</li>
        <li>Add excerpt for preview</li>
        <li>Upload cover image (optional)</li>
        <li>Select categories</li>
        <li>Choose publish or save as draft</li>
      </ol>

      <h3>Via API</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`POST /api/blogs
{
  "title": "Getting Started with Next.js",
  "slug": "getting-started-nextjs",
  "content": "Full content here...",
  "excerpt": "A beginner's guide",
  "featuredImage": "https://example.com/image.jpg",
  "published": true,
  "categoryIds": ["clx123..."]
}`}</code>
      </pre>

      <h2>Public Blog Views</h2>

      <h3>Blog List</h3>
      <p>At <code>/blog</code>:</p>
      <ul>
        <li>Shows all published posts</li>
        <li>Grid layout with cover images</li>
        <li>Excerpt and metadata</li>
        <li>Category badges</li>
        <li>Read more links</li>
      </ul>

      <h3>Individual Post</h3>
      <p>At <code>/blog/[slug]</code>:</p>
      <ul>
        <li>Full post content</li>
        <li>Author information</li>
        <li>Publication date</li>
        <li>View counter</li>
        <li>Category tags</li>
        <li>Cover image</li>
      </ul>

      <h2>SEO Features</h2>

      <h3>URL Slugs</h3>
      <ul>
        <li>Human-readable URLs: <code>/blog/my-post-title</code></li>
        <li>Unique slugs enforced at database level</li>
        <li>Auto-generated from title (can be customized)</li>
      </ul>

      <h3>Metadata</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// src/app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
  });

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featuredImage],
    },
  };
}`}</code>
      </pre>

      <h2>Categories</h2>

      <h3>Create Category</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`POST /api/categories
{
  "name": "Technology",
  "slug": "technology",
  "description": "Tech news and tutorials"
}`}</code>
      </pre>

      <h3>Assign to Post</h3>
      <p>A post can have multiple categories:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`await prisma.blogCategory.createMany({
  data: [
    { blogId: post.id, categoryId: "cat1" },
    { blogId: post.id, categoryId: "cat2" },
  ],
});`}</code>
      </pre>

      <h2>View Tracking</h2>
      <p>View count increments automatically when post is viewed:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`await prisma.blog.update({
  where: { id: blog.id },
  data: { views: { increment: 1 } },
});`}</code>
      </pre>

      <h2>Content Formatting</h2>

      <h3>Markdown Support</h3>
      <p>Content can be written in Markdown and rendered with proper styling:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`<div className="prose prose-slate dark:prose-invert max-w-none">
  {content}
</div>`}</code>
      </pre>

      <h2>Best Practices</h2>
      <ul>
        <li>Write compelling titles and excerpts</li>
        <li>Use high-quality cover images</li>
        <li>Organize with relevant categories</li>
        <li>Keep URLs short and descriptive</li>
        <li>Optimize images for web</li>
        <li>Publish consistently</li>
        <li>Enable comments (optional feature)</li>
      </ul>

      <h2>API Endpoints</h2>
      <ul>
        <li><code>GET /api/blogs</code> - List blogs (published or all for admin)</li>
        <li><code>POST /api/blogs</code> - Create blog (admin only)</li>
        <li><code>GET /api/blogs/:id</code> - Get blog by ID or slug</li>
        <li><code>PUT /api/blogs/:id</code> - Update blog (admin only)</li>
        <li><code>DELETE /api/blogs/:id</code> - Delete blog (admin only)</li>
        <li><code>GET /api/categories</code> - List categories</li>
        <li><code>POST /api/categories</code> - Create category (admin only)</li>
      </ul>
    </div>
  );
}
