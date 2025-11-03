export default function ApiPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>REST API</h1>
      <p className="lead">
        Comprehensive REST API with 50+ documented endpoints, OpenAPI specification, and Swagger UI.
      </p>

      <h2>Overview</h2>
      <p>
        The AI SaaS Starter Kit provides a complete REST API for managing users, blogs, categories, subscriptions, and payments. All endpoints are documented with Swagger/OpenAPI and include authentication, validation, and error handling.
      </p>

      <div className="not-prose rounded-xl border bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-6 my-6">
        <h3 className="font-bold text-lg mb-2">Interactive API Documentation</h3>
        <p className="text-muted-foreground mb-4">
          Explore and test all API endpoints with Swagger UI
        </p>
        <a
          href="/api-docs"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          Open Swagger UI →
        </a>
      </div>

      <h2>Authentication</h2>

      <h3>Session-Based Auth</h3>
      <p>The API uses NextAuth session cookies for authentication:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Sign in first
POST /api/auth/signin

// Session cookie is automatically set
// Subsequent requests include the cookie automatically`}</code>
      </pre>

      <h3>Making Authenticated Requests</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`fetch('/api/users', {
  credentials: 'include', // Include session cookie
  headers: {
    'Content-Type': 'application/json',
  },
})`}</code>
      </pre>

      <h2>API Endpoints</h2>

      <h3>Authentication</h3>
      <div className="not-prose my-6 space-y-2">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs font-mono rounded">POST</span>
            <code className="text-sm">/api/auth/register</code>
          </div>
          <p className="text-sm text-muted-foreground">Register a new user with email and password</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/auth/session</code>
          </div>
          <p className="text-sm text-muted-foreground">Get current user session</p>
        </div>
      </div>

      <h3>Users</h3>
      <div className="not-prose my-6 space-y-2">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/users</code>
          </div>
          <p className="text-sm text-muted-foreground">List all users (Admin only, with pagination and search)</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs font-mono rounded">POST</span>
            <code className="text-sm">/api/users</code>
          </div>
          <p className="text-sm text-muted-foreground">Create a new user (Admin only)</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/users/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Get user details by ID</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-mono rounded">PUT</span>
            <code className="text-sm">/api/users/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Update user details</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-mono rounded">DELETE</span>
            <code className="text-sm">/api/users/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Delete a user</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs font-mono rounded">POST</span>
            <code className="text-sm">/api/users/:id/roles</code>
          </div>
          <p className="text-sm text-muted-foreground">Assign role to user (Super Admin only)</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-mono rounded">DELETE</span>
            <code className="text-sm">/api/users/:id/roles</code>
          </div>
          <p className="text-sm text-muted-foreground">Remove role from user (Super Admin only)</p>
        </div>
      </div>

      <h3>Blogs</h3>
      <div className="not-prose my-6 space-y-2">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/blogs</code>
          </div>
          <p className="text-sm text-muted-foreground">List all blog posts (public: published only)</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs font-mono rounded">POST</span>
            <code className="text-sm">/api/blogs</code>
          </div>
          <p className="text-sm text-muted-foreground">Create a new blog post (Admin only)</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/blogs/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Get blog post by ID or slug</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-mono rounded">PUT</span>
            <code className="text-sm">/api/blogs/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Update blog post (Admin only)</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-mono rounded">DELETE</span>
            <code className="text-sm">/api/blogs/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Delete blog post (Admin only)</p>
        </div>
      </div>

      <h3>Categories</h3>
      <div className="not-prose my-6 space-y-2">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/categories</code>
          </div>
          <p className="text-sm text-muted-foreground">List all categories (public)</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs font-mono rounded">POST</span>
            <code className="text-sm">/api/categories</code>
          </div>
          <p className="text-sm text-muted-foreground">Create a new category (Admin only)</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/categories/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Get category by ID or slug</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-mono rounded">PUT</span>
            <code className="text-sm">/api/categories/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Update category (Admin only)</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-mono rounded">DELETE</span>
            <code className="text-sm">/api/categories/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Delete category (Admin only, if no posts)</p>
        </div>
      </div>

      <h3>Subscriptions</h3>
      <div className="not-prose my-6 space-y-2">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/subscriptions</code>
          </div>
          <p className="text-sm text-muted-foreground">List subscriptions (own or all for admin)</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/subscriptions/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Get subscription details</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-mono rounded">DELETE</span>
            <code className="text-sm">/api/subscriptions/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Cancel subscription</p>
        </div>
      </div>

      <h3>Payments</h3>
      <div className="not-prose my-6 space-y-2">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/payments</code>
          </div>
          <p className="text-sm text-muted-foreground">List payments (own or all for admin)</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/payments/:id</code>
          </div>
          <p className="text-sm text-muted-foreground">Get payment details</p>
        </div>
      </div>

      <h3>Plans</h3>
      <div className="not-prose my-6 space-y-2">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-mono rounded">GET</span>
            <code className="text-sm">/api/plans</code>
          </div>
          <p className="text-sm text-muted-foreground">List all subscription plans (public)</p>
        </div>
      </div>

      <h2>Request/Response Format</h2>

      <h3>Example Request</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Create a blog post
POST /api/blogs
Content-Type: application/json

{
  "title": "Getting Started with Next.js 15",
  "slug": "getting-started-nextjs-15",
  "content": "Next.js 15 brings exciting new features...",
  "excerpt": "A comprehensive guide to Next.js 15",
  "featuredImage": "https://example.com/image.jpg",
  "published": true,
  "categoryIds": ["clx123..."]
}`}</code>
      </pre>

      <h3>Success Response</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "Blog post created successfully",
  "blog": {
    "id": "clx456...",
    "title": "Getting Started with Next.js 15",
    "slug": "getting-started-nextjs-15"
  }
}`}</code>
      </pre>

      <h3>Error Response</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "A blog post with this slug already exists"
}`}</code>
      </pre>

      <h2>Pagination</h2>
      <p>List endpoints support pagination with query parameters:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`GET /api/users?page=1&perPage=10

// Response
{
  "users": [...],
  "pagination": {
    "total": 42,
    "page": 1,
    "perPage": 10,
    "totalPages": 5
  }
}`}</code>
      </pre>

      <h3>Query Parameters</h3>
      <ul>
        <li><code>page</code> - Page number (default: 1)</li>
        <li><code>perPage</code> - Items per page (default: 10, max: 100)</li>
        <li><code>search</code> - Search query</li>
        <li><code>filter</code> - Filter by specific fields</li>
      </ul>

      <h2>Filtering</h2>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Filter users by role
GET /api/users?role=ADMIN

// Filter blogs by category
GET /api/blogs?category=clx123...

// Filter subscriptions by status
GET /api/subscriptions?status=active

// Combine filters
GET /api/payments?userId=clx456...&status=succeeded`}</code>
      </pre>

      <h2>Searching</h2>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Search users by name or email
GET /api/users?search=john

// Search blogs by title or content
GET /api/blogs?search=nextjs

// Search categories by name
GET /api/categories?search=technology`}</code>
      </pre>

      <h2>Error Codes</h2>
      <div className="not-prose my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Code</th>
              <th className="text-left py-2">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2"><code>200</code></td>
              <td className="py-2">Success</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><code>201</code></td>
              <td className="py-2">Created</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><code>400</code></td>
              <td className="py-2">Bad Request (validation error)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><code>401</code></td>
              <td className="py-2">Unauthorized (not signed in)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><code>403</code></td>
              <td className="py-2">Forbidden (insufficient permissions)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><code>404</code></td>
              <td className="py-2">Not Found</td>
            </tr>
            <tr>
              <td className="py-2"><code>500</code></td>
              <td className="py-2">Internal Server Error</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Rate Limiting</h2>
      <p>Consider implementing rate limiting for production:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Example with upstash/ratelimit
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

// In API route
const { success } = await ratelimit.limit(userId);
if (!success) {
  return NextResponse.json(
    { error: "Rate limit exceeded" },
    { status: 429 }
  );
}`}</code>
      </pre>

      <h2>CORS</h2>
      <p>If you need to allow cross-origin requests:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Add to API route
export async function GET(req: Request) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  // Your response
  return NextResponse.json(data, { headers });
}`}</code>
      </pre>

      <h2>Webhook Security</h2>
      <p>Stripe webhooks include signature verification:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// POST /api/webhooks/stripe
const signature = req.headers.get("stripe-signature");

const event = stripe.webhooks.constructEvent(
  body,
  signature!,
  process.env.STRIPE_WEBHOOK_SECRET!
);`}</code>
      </pre>

      <h2>Best Practices</h2>
      <ul>
        <li>Always validate input with Zod schemas</li>
        <li>Use proper HTTP status codes</li>
        <li>Implement authentication checks first</li>
        <li>Return consistent error formats</li>
        <li>Log all errors for debugging</li>
        <li>Use database transactions for multiple operations</li>
        <li>Implement idempotency for critical operations</li>
      </ul>

      <h2>Testing APIs</h2>

      <h3>With cURL</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`curl -X POST http://localhost:3000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'`}</code>
      </pre>

      <h3>With JavaScript</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`const response = await fetch('/api/blogs', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My Blog Post',
    slug: 'my-blog-post',
    content: 'Content here...',
    published: true,
  }),
});

const data = await response.json();`}</code>
      </pre>

      <h2>OpenAPI Specification</h2>
      <p>The complete OpenAPI/Swagger specification is automatically generated from JSDoc comments and available at:</p>
      <ul>
        <li><code>/api-docs</code> - Interactive Swagger UI</li>
        <li><code>/api/swagger</code> - JSON specification</li>
      </ul>

      <p>You can import the spec into tools like Postman or Insomnia for API testing.</p>
    </div>
  );
}
