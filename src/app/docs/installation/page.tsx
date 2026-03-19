import {
  CheckCircle2,
  CreditCard,
  Database as DatabaseIcon,
  Mail,
  Package,
  Rocket,
} from "lucide-react";
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

export default function InstallationPage() {
  return (
    <div className="docs-content">
      <Breadcrumbs
        items={[
          { label: "Documentation", href: "/docs" },
          { label: "Installation" },
        ]}
      />

      <div className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <DocBadge variant="default">System setup</DocBadge>
          <DocBadge variant="info">Detailed guide</DocBadge>
        </div>
        <h1>Installation and environment setup for the current repository.</h1>
        <p className="text-xl leading-8 text-[#5b534b]">
          Use this guide when you need the full environment blueprint, service integration checklist, and database
          bootstrap flow for a clean local or staging installation.
        </p>
      </div>

      <Callout type="info" title="Before you begin">
        Have a working PostgreSQL instance available, use a current Node.js runtime supported by your Next.js setup,
        and decide whether your email delivery will use Resend or SMTP.
      </Callout>

      <h2>Prerequisites</h2>

      <CardGrid cols={4}>
        <div className="rounded-[1.4rem] border border-[#c7b8aa] bg-[#f6efe7] p-5">
          <Package className="mb-4 h-5 w-5 text-[#1f1b18]" />
          <h3 className="!mt-0 !mb-2 text-lg font-semibold">Node.js</h3>
          <p className="!mb-0 text-sm leading-7 text-[#5b534b]">Use a recent Node.js runtime compatible with Next.js 16.</p>
        </div>
        <div className="rounded-[1.4rem] border border-[#c7b8aa] bg-[#f6efe7] p-5">
          <DatabaseIcon className="mb-4 h-5 w-5 text-[#1f1b18]" />
          <h3 className="!mt-0 !mb-2 text-lg font-semibold">PostgreSQL</h3>
          <p className="!mb-0 text-sm leading-7 text-[#5b534b]">A local or managed PostgreSQL database reachable from your app.</p>
        </div>
        <div className="rounded-[1.4rem] border border-[#c7b8aa] bg-[#f6efe7] p-5">
          <Mail className="mb-4 h-5 w-5 text-[#1f1b18]" />
          <h3 className="!mt-0 !mb-2 text-lg font-semibold">Email provider</h3>
          <p className="!mb-0 text-sm leading-7 text-[#5b534b]">Resend is preferred. SMTP is supported as the fallback path.</p>
        </div>
        <div className="rounded-[1.4rem] border border-[#c7b8aa] bg-[#f6efe7] p-5">
          <CreditCard className="mb-4 h-5 w-5 text-[#1f1b18]" />
          <h3 className="!mt-0 !mb-2 text-lg font-semibold">External services</h3>
          <p className="!mb-0 text-sm leading-7 text-[#5b534b]">OAuth, Stripe, and OpenRouter can be added after the first local boot.</p>
        </div>
      </CardGrid>

      <h2>Install the project</h2>

      <CodeBlock
        code={`git clone <your-repository-url> saaskit
cd saaskit
npm install
cp .env.example .env`}
        language="bash"
        title="Terminal"
      />

      <Callout type="note" title="PowerShell">
        If you are working on Windows PowerShell, use <InlineCode>Copy-Item .env.example .env</InlineCode> instead of <InlineCode>cp</InlineCode> when needed.
      </Callout>

      <h2>Environment blueprint</h2>
      <p>
        The block below reflects the variables currently referenced by the app, the docs, and the deployment flow.
      </p>

      <CodeBlock
        code={`# Core application
DATABASE_URL="postgresql://user:password@localhost:5432/saaskit?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-strong-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
APP_NAME="AI SaaS"

# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_ID="..."
GITHUB_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_PRO_MONTHLY_PRICE_ID="price_..."
STRIPE_PRO_YEARLY_PRICE_ID="price_..."
STRIPE_BUSINESS_MONTHLY_PRICE_ID="price_..."
STRIPE_BUSINESS_YEARLY_PRICE_ID="price_..."

# OpenRouter
OPENROUTER_API_KEY="sk-or-v1-..."
OPENROUTER_BASE_URL="https://openrouter.ai/api/v1"

# Email: preferred production path
RESEND_API_KEY="re_..."

# Email: SMTP fallback
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="you@example.com"
SMTP_PASS="app-password"
SMTP_FROM="AI SaaS <you@example.com>"
ADMIN_EMAIL="ops@example.com"

# Optional monitoring
SENTRY_DSN=""
SENTRY_ORG=""
SENTRY_PROJECT=""

# Optional CI helper
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING="1"`}
        language="bash"
        title=".env"
        showLineNumbers={true}
      />

      <Callout type="warning" title="Secrets">
        Never commit <InlineCode>.env</InlineCode> to version control. Keep secrets in local env files, CI secret
        stores, or your hosting platform's environment manager.
      </Callout>

      <h2>Bootstrap the app</h2>

      <Steps>
        <Step step={1} title="Generate the Prisma client">
          <CodeBlock code="npm run prisma:generate" language="bash" title="Terminal" />
        </Step>

        <Step step={2} title="Push the schema to PostgreSQL">
          <p>Use the current bootstrap flow for this repository.</p>
          <CodeBlock code="npm run db:push" language="bash" title="Terminal" />
        </Step>

        <Step step={3} title="Seed starter data">
          <p>The seed creates roles, permissions, plans, categories, and tags.</p>
          <CodeBlock code="npm run db:seed" language="bash" title="Terminal" />
        </Step>

        <Step step={4} title="Run the development server">
          <CodeBlock code="npm run dev" language="bash" title="Terminal" />
        </Step>
      </Steps>

      <Callout type="info" title="Prisma note">
        The current repo does not ship checked-in Prisma migrations. For first-time installs, use <InlineCode>db:push</InlineCode>.
        If you later introduce migrations, production deploys should switch to <InlineCode>prisma migrate deploy</InlineCode>.
      </Callout>

      <h2>Configure the product services</h2>

      <CardGrid cols={2}>
        <LinkCard
          title="Authentication"
          description="Set up Google and GitHub OAuth, session behavior, credentials sign-in, and RBAC."
          href="/docs/authentication"
        />
        <LinkCard
          title="Billing"
          description="Create Stripe products, wire price IDs, and configure the webhook endpoint."
          href="/docs/billing"
        />
        <LinkCard
          title="AI Integration"
          description="Add your OpenRouter key, choose models, and validate credits and request flow."
          href="/docs/ai"
        />
        <LinkCard
          title="Deployment"
          description="Take the local install to Vercel, Railway, or your own Node host."
          href="/docs/deployment"
        />
      </CardGrid>

      <h2>Build verification</h2>

      <CodeBlock
        code={`npm run build
npm run start`}
        language="bash"
        title="Production check"
      />

      <h2>Installation checklist</h2>

      <div className="my-6 space-y-3">
        {[
          "The app loads at localhost:3000 and the docs shell renders correctly.",
          "The database connection works and seed data is visible in Prisma Studio.",
          "Auth pages load without missing-secret or callback errors.",
          "Email delivery is configured for verification and notifications.",
          "Stripe and OpenRouter credentials are ready for the next integration pass.",
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

      <div className="my-12 rounded-[1.9rem] border border-[#c7b8aa] bg-[#efe6dc] p-8">
        <div className="max-w-2xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f1b18] text-[#f3eadf]">
            <Rocket className="h-5 w-5" />
          </div>
          <h3 className="!mt-0 text-2xl font-semibold">Next step</h3>
          <p className="mt-3 text-base leading-8 text-[#5b534b]">
            Once installation is complete, move into deployment to align production domains, Stripe webhooks, and the
            database bootstrap sequence with your hosting platform.
          </p>
        </div>
      </div>
    </div>
  );
}
