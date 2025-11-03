export default function AuthenticationPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Authentication</h1>
      <p className="lead">
        Secure authentication with NextAuth v5, OAuth providers, and role-based access control (RBAC).
      </p>

      <h2>Overview</h2>
      <p>
        The AI SaaS Starter Kit uses NextAuth.js (Auth.js v5) for authentication. It supports multiple authentication methods including OAuth providers and email/password credentials with built-in RBAC.
      </p>

      <h2>Authentication Methods</h2>

      <h3>1. OAuth Providers</h3>
      <p>Pre-configured OAuth providers:</p>
      <ul>
        <li><strong>Google</strong> - Sign in with Google account</li>
        <li><strong>GitHub</strong> - Sign in with GitHub account</li>
      </ul>

      <h4>Configuration</h4>
      <p>Set up OAuth providers in your <code>.env</code> file:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"`}</code>
      </pre>

      <h4>Google OAuth Setup</h4>
      <ol>
        <li>Go to <a href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</a></li>
        <li>Create a new project or select existing one</li>
        <li>Navigate to APIs & Services → Credentials</li>
        <li>Click "Create Credentials" → "OAuth client ID"</li>
        <li>Select "Web application"</li>
        <li>Add authorized redirect URI:
          <ul>
            <li>Development: <code>http://localhost:3000/api/auth/callback/google</code></li>
            <li>Production: <code>https://yourdomain.com/api/auth/callback/google</code></li>
          </ul>
        </li>
        <li>Copy Client ID and Client Secret to <code>.env</code></li>
      </ol>

      <h4>GitHub OAuth Setup</h4>
      <ol>
        <li>Go to GitHub Settings → Developer settings → OAuth Apps</li>
        <li>Click "New OAuth App"</li>
        <li>Fill in application details:
          <ul>
            <li>Homepage URL: <code>http://localhost:3000</code></li>
            <li>Authorization callback URL: <code>http://localhost:3000/api/auth/callback/github</code></li>
          </ul>
        </li>
        <li>Click "Register application"</li>
        <li>Generate a new client secret</li>
        <li>Copy Client ID and Client Secret to <code>.env</code></li>
      </ol>

      <h3>2. Email/Password (Credentials)</h3>
      <p>Users can register and sign in with email and password.</p>

      <h4>Password Security</h4>
      <ul>
        <li>Passwords hashed with bcrypt (10 rounds)</li>
        <li>Minimum 8 characters required</li>
        <li>Stored securely in database</li>
      </ul>

      <h4>Registration Flow</h4>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}

// Response
{
  "message": "User registered successfully",
  "user": {
    "id": "clx123...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}`}</code>
      </pre>

      <h2>Role-Based Access Control (RBAC)</h2>
      <p>The application implements a comprehensive RBAC system with three default roles:</p>

      <h3>Default Roles</h3>
      <div className="not-prose rounded-xl border bg-card p-6 my-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg mb-2 text-blue-600">USER</h4>
            <p className="text-muted-foreground">Standard user role with basic permissions</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Access to dashboard</li>
              <li>• Manage own profile</li>
              <li>• Use AI features (with credits)</li>
              <li>• View own subscription</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2 text-purple-600">ADMIN</h4>
            <p className="text-muted-foreground">Administrative role with elevated permissions</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• All USER permissions</li>
              <li>• Manage users and subscriptions</li>
              <li>• View analytics dashboard</li>
              <li>• Manage blog posts</li>
              <li>• Process refunds</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2 text-red-600">SUPER_ADMIN</h4>
            <p className="text-muted-foreground">Full system access with all permissions</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• All ADMIN permissions</li>
              <li>• Assign/remove roles</li>
              <li>• System configuration</li>
              <li>• Database management</li>
              <li>• Delete users</li>
            </ul>
          </div>
        </div>
      </div>

      <h3>Assigning Roles</h3>
      <p>Roles can be assigned via:</p>

      <h4>1. Prisma Studio</h4>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`# Open Prisma Studio
npx prisma studio

# Navigate to UserRole table
# Create new record with userId and roleId`}</code>
      </pre>

      <h4>2. SQL Query</h4>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`-- Assign SUPER_ADMIN role
INSERT INTO "UserRole" ("userId", "roleId", "assignedAt")
VALUES (
  'user-id-here',
  (SELECT id FROM "Role" WHERE name = 'SUPER_ADMIN'),
  NOW()
);`}</code>
      </pre>

      <h4>3. API Endpoint (SUPER_ADMIN only)</h4>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// POST /api/users/{userId}/roles
{
  "roleId": "role-id-here"
}`}</code>
      </pre>

      <h2>Session Management</h2>

      <h3>JWT Sessions</h3>
      <p>NextAuth uses JWT (JSON Web Tokens) for session management:</p>
      <ul>
        <li>Stateless authentication</li>
        <li>No database queries on every request</li>
        <li>Automatic token rotation</li>
        <li>Secure httpOnly cookies</li>
      </ul>

      <h3>Session Configuration</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// src/lib/auth.ts
export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // ...
}`}</code>
      </pre>

      <h3>Accessing Session</h3>

      <h4>Server Components</h4>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return <div>Welcome, {session.user.name}!</div>;
}`}</code>
      </pre>

      <h4>Client Components</h4>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`"use client";
import { useSession } from "next-auth/react";

export default function ClientComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;

  return <div>Welcome, {session.user.name}!</div>;
}`}</code>
      </pre>

      <h2>Protected Routes</h2>

      <h3>Middleware Protection</h3>
      <p>Protect routes using middleware (<code>middleware.ts</code>):</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/users/:path*",
  ],
};`}</code>
      </pre>

      <h3>Server-Side Protection</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  // Page content
}`}</code>
      </pre>

      <h3>Role-Based Protection</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  // Check if user is admin
  const userRoles = await prisma.userRole.findMany({
    where: { userId: session.user.id },
    include: { role: true },
  });

  const isAdmin = userRoles.some(
    (ur) => ur.role.name === "ADMIN" || ur.role.name === "SUPER_ADMIN"
  );

  if (!isAdmin) {
    redirect("/dashboard");
  }

  // Admin page content
}`}</code>
      </pre>

      <h2>User Registration Flow</h2>

      <h3>Default Credits</h3>
      <p>New users receive 100 free credits upon registration:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    credits: 100, // Free credits
    emailVerified: new Date(),
  },
});`}</code>
      </pre>

      <h3>Default Role Assignment</h3>
      <p>New users automatically receive the USER role:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`const userRole = await prisma.role.findUnique({
  where: { name: "USER" },
});

await prisma.userRole.create({
  data: {
    userId: user.id,
    roleId: userRole.id,
  },
});`}</code>
      </pre>

      <h2>Security Best Practices</h2>

      <h3>Environment Variables</h3>
      <ul>
        <li>Never commit <code>.env</code> files to version control</li>
        <li>Use strong, random <code>NEXTAUTH_SECRET</code> (32+ characters)</li>
        <li>Rotate secrets regularly</li>
      </ul>

      <h3>Password Security</h3>
      <ul>
        <li>Minimum 8 characters enforced</li>
        <li>Bcrypt hashing with 10 rounds</li>
        <li>Consider adding password complexity requirements</li>
        <li>Implement password reset functionality</li>
      </ul>

      <h3>OAuth Security</h3>
      <ul>
        <li>Use HTTPS in production</li>
        <li>Verify redirect URIs match exactly</li>
        <li>Keep client secrets secure</li>
        <li>Enable 2FA on provider accounts</li>
      </ul>

      <h3>Session Security</h3>
      <ul>
        <li>httpOnly cookies prevent XSS attacks</li>
        <li>Secure flag in production (HTTPS only)</li>
        <li>SameSite attribute prevents CSRF</li>
        <li>Regular session rotation</li>
      </ul>

      <h2>Troubleshooting</h2>

      <h3>OAuth Sign-In Failed</h3>
      <ul>
        <li>Verify client ID and secret are correct</li>
        <li>Check redirect URIs match exactly</li>
        <li>Ensure OAuth app is enabled in provider dashboard</li>
        <li>Check <code>NEXTAUTH_URL</code> is set correctly</li>
      </ul>

      <h3>Session Not Persisting</h3>
      <ul>
        <li>Verify <code>NEXTAUTH_SECRET</code> is set</li>
        <li>Check cookies are enabled in browser</li>
        <li>Ensure domain matches in production</li>
        <li>Clear browser cookies and try again</li>
      </ul>

      <h3>Role Permissions Not Working</h3>
      <ul>
        <li>Verify user has correct role assigned in database</li>
        <li>Check role name matches exactly (case-sensitive)</li>
        <li>Clear session and sign in again</li>
        <li>Verify role checking logic is correct</li>
      </ul>

      <h2>API Reference</h2>
      <p>See the <a href="/api-docs">API Documentation</a> for complete authentication endpoints:</p>
      <ul>
        <li><code>POST /api/auth/register</code> - Register new user</li>
        <li><code>POST /api/auth/signin</code> - Sign in</li>
        <li><code>POST /api/auth/signout</code> - Sign out</li>
        <li><code>GET /api/auth/session</code> - Get current session</li>
      </ul>
    </div>
  );
}
