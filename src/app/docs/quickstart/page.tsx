import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuickStartPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Quick Start Guide</h1>
      <p className="lead">
        Get your AI SaaS application up and running in less than 5 minutes.
      </p>

      {/* Prerequisites */}
      <h2>Prerequisites</h2>
      <p>Before you begin, make sure you have the following installed:</p>
      <ul>
        <li>Node.js 18.17 or later</li>
        <li>PostgreSQL database</li>
        <li>Git</li>
      </ul>

      {/* Step 1 */}
      <div className="not-prose my-8 rounded-xl border bg-muted/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
            1
          </div>
          <h3 className="text-xl font-bold">Clone the Repository</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Clone the repository to your local machine:
        </p>
        <pre className="bg-background border rounded-lg p-4 overflow-x-auto">
          <code>{`git clone https://github.com/yourusername/ai-saas-starter.git
cd ai-saas-starter`}</code>
        </pre>
      </div>

      {/* Step 2 */}
      <div className="not-prose my-8 rounded-xl border bg-muted/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
            2
          </div>
          <h3 className="text-xl font-bold">Install Dependencies</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Install all required packages:
        </p>
        <pre className="bg-background border rounded-lg p-4 overflow-x-auto">
          <code>npm install</code>
        </pre>
      </div>

      {/* Step 3 */}
      <div className="not-prose my-8 rounded-xl border bg-muted/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
            3
          </div>
          <h3 className="text-xl font-bold">Environment Variables</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Copy the example environment file and configure your variables:
        </p>
        <pre className="bg-background border rounded-lg p-4 overflow-x-auto mb-4">
          <code>cp .env.example .env</code>
        </pre>
        <p className="text-sm text-muted-foreground mb-2">
          Update the following required variables in <code>.env</code>:
        </p>
        <pre className="bg-background border rounded-lg p-4 overflow-x-auto text-sm">
          <code>{`# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="your-webhook-secret"

# OpenRouter AI
OPENROUTER_API_KEY="your-openrouter-api-key"`}</code>
        </pre>
      </div>

      {/* Step 4 */}
      <div className="not-prose my-8 rounded-xl border bg-muted/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
            4
          </div>
          <h3 className="text-xl font-bold">Database Setup</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Initialize your database with Prisma:
        </p>
        <pre className="bg-background border rounded-lg p-4 overflow-x-auto">
          <code>{`# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed`}</code>
        </pre>
      </div>

      {/* Step 5 */}
      <div className="not-prose my-8 rounded-xl border bg-muted/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
            5
          </div>
          <h3 className="text-xl font-bold">Start Development Server</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Run the development server:
        </p>
        <pre className="bg-background border rounded-lg p-4 overflow-x-auto">
          <code>npm run dev</code>
        </pre>
        <p className="text-muted-foreground mt-4">
          Open <a href="http://localhost:3000" target="_blank" className="text-primary hover:underline">http://localhost:3000</a> in your browser. 🎉
        </p>
      </div>

      {/* Next Steps */}
      <h2>Next Steps</h2>
      <div className="not-prose grid gap-4 sm:grid-cols-2 my-6">
        <Link
          href="/docs/authentication"
          className="flex flex-col gap-2 rounded-lg border bg-card p-4 hover:bg-muted transition-colors"
        >
          <h4 className="font-semibold">Set Up Authentication</h4>
          <p className="text-sm text-muted-foreground">
            Configure OAuth providers and role-based access control
          </p>
          <div className="flex items-center gap-2 text-sm text-primary font-medium mt-auto">
            Learn more <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
        <Link
          href="/docs/billing"
          className="flex flex-col gap-2 rounded-lg border bg-card p-4 hover:bg-muted transition-colors"
        >
          <h4 className="font-semibold">Configure Stripe Billing</h4>
          <p className="text-sm text-muted-foreground">
            Set up subscription plans and payment processing
          </p>
          <div className="flex items-center gap-2 text-sm text-primary font-medium mt-auto">
            Learn more <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
        <Link
          href="/docs/ai"
          className="flex flex-col gap-2 rounded-lg border bg-card p-4 hover:bg-muted transition-colors"
        >
          <h4 className="font-semibold">AI Integration</h4>
          <p className="text-sm text-muted-foreground">
            Connect to 200+ AI models via OpenRouter
          </p>
          <div className="flex items-center gap-2 text-sm text-primary font-medium mt-auto">
            Learn more <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
        <Link
          href="/docs/deployment"
          className="flex flex-col gap-2 rounded-lg border bg-card p-4 hover:bg-muted transition-colors"
        >
          <h4 className="font-semibold">Deploy to Production</h4>
          <p className="text-sm text-muted-foreground">
            Deploy your app to Vercel, Railway, or any platform
          </p>
          <div className="flex items-center gap-2 text-sm text-primary font-medium mt-auto">
            Learn more <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </div>

      {/* Troubleshooting */}
      <h2>Troubleshooting</h2>
      <div className="not-prose rounded-xl border bg-card p-6 my-6">
        <h4 className="font-semibold mb-4">Common Issues</h4>
        <div className="space-y-4">
          <div>
            <h5 className="font-medium mb-2">Database Connection Error</h5>
            <p className="text-sm text-muted-foreground">
              Make sure PostgreSQL is running and your <code>DATABASE_URL</code> is correct.
            </p>
          </div>
          <div>
            <h5 className="font-medium mb-2">OAuth Sign-In Not Working</h5>
            <p className="text-sm text-muted-foreground">
              Verify your OAuth client IDs and secrets. Make sure your redirect URLs are configured correctly in the provider dashboards.
            </p>
          </div>
          <div>
            <h5 className="font-medium mb-2">Stripe Webhooks Failing</h5>
            <p className="text-sm text-muted-foreground">
              Use <code>stripe listen --forward-to localhost:3000/api/webhooks/stripe</code> for local testing.
            </p>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="not-prose rounded-xl border bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-6 my-8">
        <h4 className="font-semibold mb-2">Need Help?</h4>
        <p className="text-muted-foreground mb-4">
          If you run into any issues, check out our documentation or reach out for support.
        </p>
        <div className="flex gap-3">
          <Link href="/docs">
            <Button variant="outline">View Docs</Button>
          </Link>
          <Link href="/api-docs">
            <Button variant="outline">API Reference</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
