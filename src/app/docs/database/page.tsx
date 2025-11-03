export default function DatabasePage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Database & Prisma</h1>
      <p className="lead">
        PostgreSQL database with Prisma ORM, type-safe queries, and automatic migrations.
      </p>

      <h2>Overview</h2>
      <p>
        The application uses PostgreSQL as the database and Prisma as the ORM. Prisma provides type-safe database access, automatic migrations, and a visual database browser (Prisma Studio).
      </p>

      <h2>Database Setup</h2>

      <h3>PostgreSQL Installation</h3>
      <p>Choose one of the following options:</p>
      <ul>
        <li><strong>Local</strong>: Install PostgreSQL on your machine</li>
        <li><strong>Docker</strong>: Run PostgreSQL in a container</li>
        <li><strong>Cloud</strong>: Use Vercel Postgres, Supabase, Railway, or Neon</li>
      </ul>

      <h4>Docker Setup</h4>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`docker run --name postgres \\
  -e POSTGRES_PASSWORD=password \\
  -e POSTGRES_DB=ai_saas \\
  -p 5432:5432 \\
  -d postgres:16`}</code>
      </pre>

      <h3>Connection String</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# .env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"`}</code>
      </pre>

      <h2>Prisma Schema</h2>

      <h3>Models Overview</h3>
      <ul>
        <li><strong>User</strong> - User accounts and authentication</li>
        <li><strong>Account</strong> - OAuth provider accounts</li>
        <li><strong>Session</strong> - User sessions</li>
        <li><strong>Role</strong> - RBAC roles (USER, ADMIN, SUPER_ADMIN)</li>
        <li><strong>UserRole</strong> - User-role assignments</li>
        <li><strong>Permission</strong> - Granular permissions</li>
        <li><strong>Plan</strong> - Subscription plans</li>
        <li><strong>Subscription</strong> - User subscriptions</li>
        <li><strong>Payment</strong> - Payment records</li>
        <li><strong>Blog</strong> - Blog posts</li>
        <li><strong>Category</strong> - Blog categories</li>
        <li><strong>BlogCategory</strong> - Many-to-many join table</li>
        <li><strong>Chat</strong> - AI chat conversations</li>
        <li><strong>CreditUsage</strong> - Credit consumption tracking</li>
      </ul>

      <h3>Key Relationships</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// User has many roles (many-to-many)
User ↔ UserRole ↔ Role

// User has one subscription (one-to-one)
User ← Subscription → Plan

// User has many payments (one-to-many)
User ← Payment

// Blog has many categories (many-to-many)
Blog ↔ BlogCategory ↔ Category`}</code>
      </pre>

      <h2>Migrations</h2>

      <h3>Create Migration</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`# Create a new migration
npx prisma migrate dev --name add_new_field

# Apply migrations to production
npx prisma migrate deploy`}</code>
      </pre>

      <h3>Reset Database</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`# Reset database (destructive!)
npx prisma migrate reset

# This will:
# 1. Drop the database
# 2. Create a new database
# 3. Apply all migrations
# 4. Run seed script`}</code>
      </pre>

      <h2>Prisma Client</h2>

      <h3>Basic Queries</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`import { prisma } from "@/lib/prisma";

// Find many
const users = await prisma.user.findMany();

// Find one
const user = await prisma.user.findUnique({
  where: { id: userId },
});

// Create
const user = await prisma.user.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
  },
});

// Update
const user = await prisma.user.update({
  where: { id: userId },
  data: { name: "Jane Doe" },
});

// Delete
await prisma.user.delete({
  where: { id: userId },
});`}</code>
      </pre>

      <h3>Relations</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Include related data
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    subscription: {
      include: {
        plan: true,
      },
    },
    userRoles: {
      include: {
        role: true,
      },
    },
  },
});

// Select specific fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
});`}</code>
      </pre>

      <h3>Filtering</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Where conditions
const users = await prisma.user.findMany({
  where: {
    email: {
      contains: "@example.com",
    },
    credits: {
      gte: 100,
    },
  },
});

// OR conditions
const users = await prisma.user.findMany({
  where: {
    OR: [
      { name: { contains: "John" } },
      { email: { contains: "john" } },
    ],
  },
});`}</code>
      </pre>

      <h3>Pagination</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`const page = 1;
const perPage = 10;

const users = await prisma.user.findMany({
  take: perPage,
  skip: (page - 1) * perPage,
  orderBy: { createdAt: 'desc' },
});

const total = await prisma.user.count();`}</code>
      </pre>

      <h2>Prisma Studio</h2>
      <p>Visual database browser for viewing and editing data:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>npx prisma studio</code>
      </pre>
      <p>Access at <code>http://localhost:5555</code></p>

      <h2>Seeding</h2>

      <h3>Seed Script</h3>
      <p>Located at <code>prisma/seed.ts</code>, creates:</p>
      <ul>
        <li>3 default roles (USER, ADMIN, SUPER_ADMIN)</li>
        <li>Permissions for each role</li>
        <li>3 subscription plans (Free, Pro, Business)</li>
        <li>Sample blog categories</li>
      </ul>

      <h3>Run Seed</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>npx prisma db seed</code>
      </pre>

      <h2>Transactions</h2>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// All or nothing - rollback on error
await prisma.$transaction(async (tx) => {
  const user = await tx.user.update({
    where: { id: userId },
    data: { credits: { decrement: 10 } },
  });

  await tx.creditUsage.create({
    data: {
      userId,
      amount: 10,
      description: "AI Chat",
    },
  });
});`}</code>
      </pre>

      <h2>Performance Optimization</h2>

      <h3>Indexes</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`model User {
  id    String @id @default(cuid())
  email String @unique // Automatic index
  name  String

  @@index([email]) // Custom index
  @@index([createdAt])
}`}</code>
      </pre>

      <h3>Connection Pooling</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// DATABASE_URL with pooling
DATABASE_URL="postgresql://user:pass@host/db?connection_limit=10&pool_timeout=20"`}</code>
      </pre>

      <h2>Best Practices</h2>
      <ul>
        <li>Use transactions for related operations</li>
        <li>Select only needed fields</li>
        <li>Add indexes for frequently queried fields</li>
        <li>Use connection pooling in production</li>
        <li>Handle unique constraint errors</li>
        <li>Use soft deletes for important data</li>
      </ul>

      <h2>Troubleshooting</h2>

      <h3>Connection Refused</h3>
      <ul>
        <li>Verify PostgreSQL is running</li>
        <li>Check DATABASE_URL is correct</li>
        <li>Ensure firewall allows connection</li>
      </ul>

      <h3>Migration Failed</h3>
      <ul>
        <li>Check for syntax errors in schema</li>
        <li>Resolve data conflicts before migration</li>
        <li>Use <code>--create-only</code> to review SQL first</li>
      </ul>
    </div>
  );
}
