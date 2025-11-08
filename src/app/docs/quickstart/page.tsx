import Link from "next/link";
import { ArrowRight, Check, Clock, Terminal, Package, Database as DatabaseIcon, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Callout,
  CodeBlock,
  DocBadge,
  Steps,
  Step,
  Breadcrumbs,
  LinkCard,
  InlineCode,
  CardGrid,
} from "@/components/docs/doc-components";

export default function QuickStartPage() {
  return (
    <div className="docs-content">
      <Breadcrumbs
        items={[
          { label: "Documentation", href: "/docs" },
          { label: "Quick Start" },
        ]}
      />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="!mb-0">Quick Start Guide</h1>
          <DocBadge variant="success">
            <Clock className="h-3 w-3 mr-1 inline" />
            5 minutes
          </DocBadge>
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Get your AI SaaS application up and running in less than 5 minutes.
        </p>
      </div>

      <Callout type="info" title="What you'll build">
        By the end of this guide, you'll have a fully functional SaaS application with authentication, billing, database, and AI integration running locally.
      </Callout>

      {/* Prerequisites */}
      <h2>Prerequisites</h2>
      <p>Before you begin, make sure you have the following installed:</p>

      <CardGrid cols={3}>
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
              <Terminal className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-semibold !mt-0 !mb-0">Node.js</h4>
          </div>
          <p className="text-sm text-muted-foreground !mb-0">Version 18.17 or later</p>
        </div>
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
              <DatabaseIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold !mt-0 !mb-0">PostgreSQL</h4>
          </div>
          <p className="text-sm text-muted-foreground !mb-0">Database server</p>
        </div>
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950">
              <Package className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-semibold !mt-0 !mb-0">Git</h4>
          </div>
          <p className="text-sm text-muted-foreground !mb-0">Version control</p>
        </div>
      </CardGrid>

      <h2>Installation Steps</h2>

      <Steps>
        <Step step={1} title="Clone the Repository">
          <p>Clone the repository to your local machine:</p>
          <CodeBlock
            code="git clone https://github.com/yourusername/ai-saas-starter.git\ncd ai-saas-starter"
            language="bash"
            title="Terminal"
          />
        </Step>

        <Step step={2} title="Install Dependencies">
          <p>Install all required packages using npm:</p>
          <CodeBlock
            code="npm install"
            language="bash"
            title="Terminal"
          />
          <Callout type="note">
            This will install all dependencies listed in <InlineCode>package.json</InlineCode>. The installation may take a few minutes.
          </Callout>
        </Step>

        <Step step={3} title="Configure Environment Variables">
          <p>Copy the example environment file and configure your variables:</p>
          <CodeBlock
            code="cp .env.example .env"
            language="bash"
            title="Terminal"
          />
          <p>Update the following required variables in your <InlineCode>.env</InlineCode> file:</p>
          <CodeBlock
            code={`# Database
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
OPENROUTER_API_KEY="your-openrouter-api-key"`}
            language="bash"
            title=".env"
          />
          <Callout type="warning" title="Security Note">
            Never commit your <InlineCode>.env</InlineCode> file to version control. It contains sensitive credentials.
          </Callout>
        </Step>

        <Step step={4} title="Set Up Database">
          <p>Initialize your database with Prisma:</p>
          <CodeBlock
            code={`# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed`}
            language="bash"
            title="Terminal"
            showLineNumbers={true}
          />
          <Callout type="info">
            The seed command is optional but recommended for development. It will populate your database with sample data.
          </Callout>
        </Step>

        <Step step={5} title="Start Development Server">
          <p>Run the development server:</p>
          <CodeBlock
            code="npm run dev"
            language="bash"
            title="Terminal"
          />
          <Callout type="success" title="Success! 🎉">
            Your application is now running! Open{" "}
            <a href="http://localhost:3000" target="_blank" className="text-primary hover:underline font-semibold">
              http://localhost:3000
            </a>{" "}
            in your browser to see it in action.
          </Callout>
        </Step>
      </Steps>

      {/* Next Steps */}
      <h2>Next Steps</h2>
      <p>Now that your application is running, explore these key features:</p>

      <CardGrid cols={2}>
        <LinkCard
          title="Set Up Authentication"
          description="Configure OAuth providers and role-based access control"
          href="/docs/authentication"
        />
        <LinkCard
          title="Configure Stripe Billing"
          description="Set up subscription plans and payment processing"
          href="/docs/billing"
        />
        <LinkCard
          title="AI Integration"
          description="Connect to 200+ AI models via OpenRouter"
          href="/docs/ai"
        />
        <LinkCard
          title="Deploy to Production"
          description="Deploy your app to Vercel, Railway, or any platform"
          href="/docs/deployment"
        />
      </CardGrid>

      {/* Troubleshooting */}
      <h2>Troubleshooting</h2>
      <p>Encountering issues? Here are solutions to common problems:</p>

      <div className="space-y-4 my-6">
        <Callout type="danger" title="Database Connection Error">
          Make sure PostgreSQL is running and your <InlineCode>DATABASE_URL</InlineCode> is correct. You can verify the connection with:{" "}
          <InlineCode>npx prisma db pull</InlineCode>
        </Callout>

        <Callout type="warning" title="OAuth Sign-In Not Working">
          Verify your OAuth client IDs and secrets. Make sure your redirect URLs are configured correctly in the provider dashboards. For local development, use <InlineCode>http://localhost:3000</InlineCode> as the base URL.
        </Callout>

        <Callout type="info" title="Stripe Webhooks Failing">
          Use the Stripe CLI for local testing:
          <CodeBlock
            code="stripe listen --forward-to localhost:3000/api/webhooks/stripe"
            language="bash"
            title="Terminal"
          />
        </Callout>
      </div>

      {/* Support */}
      <div className="relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-indigo-500/10 p-8 my-12">
        <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold !mt-0 !mb-0">Need Help?</h3>
              <p className="text-sm text-muted-foreground !mb-0">We're here to support you</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            If you run into any issues, check out our comprehensive documentation or explore the API reference for detailed endpoint information.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/docs">
              <Button variant="outline" size="lg">View Full Documentation</Button>
            </Link>
            <Link href="/api-docs">
              <Button variant="outline" size="lg">API Reference</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
