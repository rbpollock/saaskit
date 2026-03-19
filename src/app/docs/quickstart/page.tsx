import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";
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

      <div className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <DocBadge variant="success">
            <Clock3 className="mr-1 h-3 w-3" />
            Fast setup
          </DocBadge>
          <DocBadge variant="info">Repo-accurate</DocBadge>
        </div>
        <h1>Quick start for getting the starter running with the right defaults.</h1>
        <p className="text-xl leading-8 text-[#5b534b]">
          This guide gets you from fresh clone to a working local environment with the database bootstrapped,
          authentication configured at the platform level, and the product ready for service integrations.
        </p>
      </div>

      <Callout type="info" title="Outcome">
        By the end of this guide you will have the app running locally, Prisma synced to PostgreSQL, starter data
        seeded, and the core environment variables in place.
      </Callout>

      <CardGrid cols={3}>
        <div className="rounded-[1.45rem] border border-[#c7b8aa] bg-[#f6efe7] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f1b18] text-[#f3eadf]">
            <Rocket className="h-5 w-5" />
          </div>
          <h3 className="!mt-0 !mb-2 text-lg font-semibold">Install</h3>
          <p className="!mb-0 text-sm leading-7 text-[#5b534b]">
            Clone the repository and install dependencies with the existing npm workflow.
          </p>
        </div>
        <div className="rounded-[1.45rem] border border-[#c7b8aa] bg-[#f6efe7] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f1b18] text-[#f3eadf]">
            <Database className="h-5 w-5" />
          </div>
          <h3 className="!mt-0 !mb-2 text-lg font-semibold">Bootstrap</h3>
          <p className="!mb-0 text-sm leading-7 text-[#5b534b]">
            Generate Prisma client, push the schema, and seed roles, plans, and starter content.
          </p>
        </div>
        <div className="rounded-[1.45rem] border border-[#c7b8aa] bg-[#f6efe7] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f1b18] text-[#f3eadf]">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="!mt-0 !mb-2 text-lg font-semibold">Connect</h3>
          <p className="!mb-0 text-sm leading-7 text-[#5b534b]">
            Add OAuth, Stripe, email, and OpenRouter credentials once the local app is healthy.
          </p>
        </div>
      </CardGrid>

      <h2>Setup flow</h2>

      <Steps>
        <Step step={1} title="Clone the repository and install dependencies">
          <p>Start with a normal npm install in a clean working directory.</p>
          <CodeBlock
            code={`git clone <your-repository-url> saaskit
cd saaskit
npm install`}
            language="bash"
            title="Terminal"
          />
        </Step>

        <Step step={2} title="Copy the environment file and add the core variables">
          <p>For the first boot, focus on the base app configuration and one working email provider.</p>
          <CodeBlock
            code={`# Core application
DATABASE_URL="postgresql://user:password@localhost:5432/saaskit?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-strong-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
APP_NAME="AI SaaS"

# Email: preferred production option
RESEND_API_KEY="re_..."

# Or use SMTP instead
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="you@example.com"
SMTP_PASS="app-password"
SMTP_FROM="AI SaaS <you@example.com>"
ADMIN_EMAIL="ops@example.com"`}
            language="bash"
            title=".env"
          />
          <Callout type="note" title="Keep the first pass minimal">
            You can add OAuth, Stripe, and OpenRouter after the app is running. The full variable map lives in the
            installation guide and in <InlineCode>.env.example</InlineCode>.
          </Callout>
        </Step>

        <Step step={3} title="Generate Prisma client and bootstrap the database">
          <p>The current repository uses schema push plus seed for initial setup.</p>
          <CodeBlock
            code={`npm run prisma:generate
npm run db:push
npm run db:seed`}
            language="bash"
            title="Terminal"
            showLineNumbers={true}
          />
          <Callout type="warning" title="Current repo behavior">
            This starter includes <InlineCode>prisma/schema.prisma</InlineCode> and <InlineCode>prisma/seed.ts</InlineCode>,
            but it does not currently ship checked-in Prisma migrations. Use <InlineCode>db:push</InlineCode> for the
            initial bootstrap.
          </Callout>
        </Step>

        <Step step={4} title="Run the product locally">
          <p>Once the database is ready, start the development server and verify the shell loads cleanly.</p>
          <CodeBlock code="npm run dev" language="bash" title="Terminal" />
          <Callout type="success" title="Expected result">
            Open <a href="http://localhost:3000" target="_blank" rel="noreferrer">http://localhost:3000</a>. You should be able to
            browse the marketing pages, docs, pricing, and auth screens without database or session errors.
          </Callout>
        </Step>

        <Step step={5} title="Add service credentials for the full product flow">
          <p>After the app is stable locally, add the remaining integrations in this order.</p>
          <CodeBlock
            code={`# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_ID="..."
GITHUB_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_MONTHLY_PRICE_ID="price_..."
STRIPE_PRO_YEARLY_PRICE_ID="price_..."
STRIPE_BUSINESS_MONTHLY_PRICE_ID="price_..."
STRIPE_BUSINESS_YEARLY_PRICE_ID="price_..."

# AI
OPENROUTER_API_KEY="sk-or-v1-..."
OPENROUTER_BASE_URL="https://openrouter.ai/api/v1"`}
            language="bash"
            title="Additional integrations"
          />
        </Step>
      </Steps>

      <h2>What to verify before moving on</h2>

      <div className="my-6 space-y-3">
        {[
          "The home page and docs shell render without runtime errors.",
          "Registration or sign-in pages load and session cookies are created correctly.",
          "The database contains seeded roles, permissions, and plans.",
          "Email delivery is configured well enough to support verification and admin notifications.",
        ].map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-[1.2rem] border border-[#c7b8aa] bg-[#f6efe7] px-4 py-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1f1b18]" />
            <p className="!mb-0 text-sm leading-7 text-[#5b534b]">{item}</p>
          </div>
        ))}
      </div>

      <h2>Continue with the right next guide</h2>

      <CardGrid cols={2}>
        <LinkCard
          title="Installation"
          description="Full environment blueprint, service-by-service setup, and verification steps."
          href="/docs/installation"
        />
        <LinkCard
          title="Authentication"
          description="Configure OAuth providers, session behavior, roles, and access boundaries."
          href="/docs/authentication"
        />
        <LinkCard
          title="AI Integration"
          description="Wire in OpenRouter models, credits, and AI request handling."
          href="/docs/ai"
        />
        <LinkCard
          title="Deployment"
          description="Take the current repo to production with the correct database bootstrap flow."
          href="/docs/deployment"
        />
      </CardGrid>

      <div className="my-12 rounded-[1.9rem] border border-[#c7b8aa] bg-[#efe6dc] p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f1b18] text-[#f3eadf]">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="!mt-0 text-2xl font-semibold">Ready for production-facing setup?</h3>
            <p className="mt-3 text-base leading-8 text-[#5b534b]">
              Once local development is stable, move into installation for the full env map, then deployment for
              production domains, callbacks, and Stripe webhook configuration.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/docs/installation">
              <Button className="h-12 rounded-full bg-[#1f1b18] px-6 text-[#f3eadf] hover:bg-[#312a25]">
                Installation guide
              </Button>
            </Link>
            <Link href="/docs/deployment">
              <Button
                variant="outline"
                className="h-12 rounded-full border-[#b8ab9c] bg-transparent px-6 hover:bg-[#e8ddd1] hover:text-[#1f1b18]"
              >
                Deployment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
