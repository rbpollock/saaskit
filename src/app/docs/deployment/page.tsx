import {
  CheckCircle2,
  Cloud,
  CreditCard,
  Database,
  Mail,
  Server,
} from "lucide-react";
import {
  Breadcrumbs,
  Callout,
  CardGrid,
  CodeBlock,
  DocBadge,
  InlineCode,
  LinkCard,
  Steps,
  Step,
} from "@/components/docs/doc-components";

export default function DeploymentPage() {
  return (
    <div className="docs-content">
      <Breadcrumbs
        items={[
          { label: "Documentation", href: "/docs" },
          { label: "Deployment" },
        ]}
      />

      <div className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <DocBadge variant="default">Production</DocBadge>
          <DocBadge variant="success">Vercel recommended</DocBadge>
        </div>
        <h1>Deployment guidance for taking the starter to production with fewer surprises.</h1>
        <p className="text-xl leading-8 text-[#5b534b]">
          The fastest stable path is Vercel plus managed PostgreSQL, but the app can also run on Railway or a custom
          Node host. The critical detail for this repository is the database bootstrap flow.
        </p>
      </div>

      <Callout type="warning" title="Important repo note">
        This project does not currently include checked-in Prisma migrations. First-time production setup should use{" "}
        <InlineCode>npx prisma db push</InlineCode> and <InlineCode>npm run db:seed</InlineCode> against the production
        database unless you add migrations yourself.
      </Callout>

      <h2>Recommended production stack</h2>

      <CardGrid cols={4}>
        <div className="rounded-[1.4rem] border border-[#c7b8aa] bg-[#f6efe7] p-5">
          <Cloud className="mb-4 h-5 w-5 text-[#1f1b18]" />
          <h3 className="!mt-0 !mb-2 text-lg font-semibold">App host</h3>
          <p className="!mb-0 text-sm leading-7 text-[#5b534b]">Vercel for the cleanest Next.js deployment path.</p>
        </div>
        <div className="rounded-[1.4rem] border border-[#c7b8aa] bg-[#f6efe7] p-5">
          <Database className="mb-4 h-5 w-5 text-[#1f1b18]" />
          <h3 className="!mt-0 !mb-2 text-lg font-semibold">Database</h3>
          <p className="!mb-0 text-sm leading-7 text-[#5b534b]">Managed PostgreSQL from Neon, Railway, Supabase, or Vercel Postgres.</p>
        </div>
        <div className="rounded-[1.4rem] border border-[#c7b8aa] bg-[#f6efe7] p-5">
          <CreditCard className="mb-4 h-5 w-5 text-[#1f1b18]" />
          <h3 className="!mt-0 !mb-2 text-lg font-semibold">Billing</h3>
          <p className="!mb-0 text-sm leading-7 text-[#5b534b]">Stripe with product price IDs and a production webhook endpoint.</p>
        </div>
        <div className="rounded-[1.4rem] border border-[#c7b8aa] bg-[#f6efe7] p-5">
          <Mail className="mb-4 h-5 w-5 text-[#1f1b18]" />
          <h3 className="!mt-0 !mb-2 text-lg font-semibold">Email</h3>
          <p className="!mb-0 text-sm leading-7 text-[#5b534b]">Resend is the preferred production path, with SMTP supported as fallback.</p>
        </div>
      </CardGrid>

      <h2>Vercel deployment workflow</h2>

      <Steps>
        <Step step={1} title="Import the repository and define the production domain">
          <p>Push the repository to GitHub, import it into Vercel, and decide on the canonical production URL first.</p>
        </Step>

        <Step step={2} title="Set the environment variables in Vercel">
          <p>At minimum, configure the core app, database, email, Stripe, and OpenRouter variables.</p>
          <CodeBlock
            code={`DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="replace-with-a-strong-secret"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
APP_NAME="AI SaaS"

# Add your email, Stripe, OAuth, and OpenRouter vars as needed`}
            language="bash"
            title="Minimum production variables"
          />
        </Step>

        <Step step={3} title="Deploy once to verify the build and runtime wiring">
          <p>The repo already includes a Vercel-aware build path and standalone Next.js output configuration.</p>
          <CodeBlock code="npm run build" language="bash" title="Local production check" />
        </Step>

        <Step step={4} title="Bootstrap the production database">
          <p>Run these commands from a terminal where <InlineCode>DATABASE_URL</InlineCode> points to the production database.</p>
          <CodeBlock
            code={`npx prisma db push
npm run db:seed`}
            language="bash"
            title="Production bootstrap"
            showLineNumbers={true}
          />
        </Step>

        <Step step={5} title="Update external callbacks and webhooks">
          <CodeBlock
            code={`Google callback:
https://your-domain.com/api/auth/callback/google

GitHub callback:
https://your-domain.com/api/auth/callback/github

Stripe webhook endpoint:
https://your-domain.com/api/webhooks/stripe`}
            language="text"
            title="Production endpoints"
          />
        </Step>
      </Steps>

      <Callout type="info" title="After you add Prisma migrations">
        If you later decide to manage schema changes through checked-in Prisma migrations, update production deploys to
        use <InlineCode>npx prisma migrate deploy</InlineCode> instead of <InlineCode>db push</InlineCode>.
      </Callout>

      <h2>Alternative hosting options</h2>

      <CardGrid cols={2}>
        <LinkCard
          title="Railway"
          description="Useful if you want the app and PostgreSQL hosted on the same platform. Build with npm run build, start with npm start, then run the production bootstrap once."
          href="https://railway.app"
          external
        />
        <LinkCard
          title="Self-hosted Node or Docker"
          description="The app can run behind your own reverse proxy or container platform. Expose port 3000, inject runtime env vars, and bootstrap PostgreSQL before traffic goes live."
          href="/docs/installation"
        />
      </CardGrid>

      <h2>Operational checklist</h2>

      <div className="my-6 space-y-3">
        {[
          "NEXTAUTH_URL and NEXT_PUBLIC_APP_URL point to the same production domain.",
          "OAuth provider dashboards use the exact production callback URLs.",
          "Stripe price IDs match the Pro and Business plans in the application.",
          "The Stripe webhook secret is set and deliveries are succeeding.",
          "The production database contains seeded roles, permissions, and plans.",
          "Email verification links open the correct production host over HTTPS.",
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

      <h2>Common failure points</h2>

      <Callout type="danger" title="Authentication breaks only in production">
        Double-check <InlineCode>NEXTAUTH_URL</InlineCode>, HTTPS, and the exact callback URLs registered in Google
        and GitHub. A mismatch of even one character will break the sign-in round-trip.
      </Callout>

      <Callout type="warning" title="Billing looks correct but subscriptions do not update">
        Verify that <InlineCode>STRIPE_WEBHOOK_SECRET</InlineCode> is set, the production webhook endpoint is live,
        and the Stripe products behind your price IDs match the plans exposed in the UI.
      </Callout>

      <Callout type="note" title="Deployment strategy">
        If your team is using preview deployments, keep auth and billing callbacks pointed at the canonical production
        domain. Preview URLs are useful for visual review, not for customer-facing callback flows.
      </Callout>

      <h2>Related guides</h2>

      <CardGrid cols={3}>
        <LinkCard
          title="Installation"
          description="Review the complete environment layout and bootstrap commands."
          href="/docs/installation"
        />
        <LinkCard
          title="Billing"
          description="Confirm the Stripe plan and webhook behavior before launch."
          href="/docs/billing"
        />
        <LinkCard
          title="API"
          description="Check route behavior and payloads when preparing production integrations."
          href="/docs/api"
        />
      </CardGrid>

      <div className="my-12 rounded-[1.9rem] border border-[#c7b8aa] bg-[#efe6dc] p-8">
        <div className="max-w-2xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f1b18] text-[#f3eadf]">
            <Server className="h-5 w-5" />
          </div>
          <h3 className="!mt-0 text-2xl font-semibold">Professional rule of thumb</h3>
          <p className="mt-3 text-base leading-8 text-[#5b534b]">
            Treat callback URLs, database bootstrap, and webhook delivery as release blockers. Those three items are
            responsible for most production setup mistakes in a stack like this.
          </p>
        </div>
      </div>
    </div>
  );
}
