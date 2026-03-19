import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cloud,
  Code,
  CreditCard,
  Database,
  FileText,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocBadge } from "@/components/docs/doc-components";

const pathways = [
  {
    title: "Launch the app locally",
    description: "Move from install to running product with the fewest steps possible.",
    href: "/docs/quickstart",
    icon: Rocket,
    steps: ["Install dependencies", "Configure core env vars", "Push schema and seed data"],
  },
  {
    title: "Set up customer flows",
    description: "Configure sign-in, billing, and service integrations before inviting users.",
    href: "/docs/authentication",
    icon: Shield,
    steps: ["OAuth providers", "Stripe products and webhooks", "Email delivery"],
  },
  {
    title: "Prepare production deployment",
    description: "Ship the app with the right database bootstrap and callback configuration.",
    href: "/docs/deployment",
    icon: Cloud,
    steps: ["Set production domains", "Bootstrap Postgres", "Validate callbacks and webhooks"],
  },
];

const sections = [
  {
    title: "Authentication",
    description: "Auth.js, credentials sign-in, verification, sessions, and role boundaries.",
    href: "/docs/authentication",
    icon: Shield,
  },
  {
    title: "Billing",
    description: "Stripe products, subscriptions, price IDs, checkout, and webhook behavior.",
    href: "/docs/billing",
    icon: CreditCard,
  },
  {
    title: "API",
    description: "Documented routes, payload shapes, and integration expectations across the app.",
    href: "/docs/api",
    icon: Code,
  },
  {
    title: "Database",
    description: "Prisma schema structure, bootstrap flow, and guidance for evolving the data model.",
    href: "/docs/database",
    icon: Database,
  },
  {
    title: "AI Integration",
    description: "OpenRouter setup, model selection, credits, and AI request flow through the product.",
    href: "/docs/ai",
    icon: Zap,
  },
  {
    title: "Blog System",
    description: "Editorial structure, content entities, and the public-facing publishing layer.",
    href: "/docs/blog",
    icon: BookOpen,
  },
];

const principles = [
  {
    title: "Repo-accurate",
    description: "Docs are aligned with the current project scripts, env names, and Prisma bootstrap flow.",
  },
  {
    title: "Production-minded",
    description: "The guides emphasize deployment, callbacks, billing, and operational checks instead of demo-only setup.",
  },
  {
    title: "Fast to scan",
    description: "Each page is structured so an engineer can move from decision to command without digging through filler.",
  },
];

export default function DocsPage() {
  return (
    <div className="space-y-14">
      <section className="space-y-8">
        <div className="flex flex-wrap items-center gap-2">
          <DocBadge variant="default">Documentation</DocBadge>
          <DocBadge variant="info">Updated for current repo</DocBadge>
          <DocBadge variant="success">Deployment ready</DocBadge>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <h1 className="font-display text-5xl leading-[0.96] text-[#1f1b18] lg:text-7xl">
              Professional documentation for building, operating, and shipping the starter cleanly.
            </h1>
            <p className="max-w-3xl text-xl leading-8 text-[#5b534b]">
              This section is structured for engineers and operators. Start with setup, move into product systems like
              auth and billing, and finish with deployment guidance that reflects how this repository actually boots and
              runs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/docs/quickstart">
                <Button className="h-12 rounded-full bg-[#1f1b18] px-6 text-[#f3eadf] hover:bg-[#312a25]">
                  <Rocket className="mr-2 h-4 w-4" />
                  Open quick start
                </Button>
              </Link>
              <Link href="/docs/installation">
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-[#b8ab9c] bg-transparent px-6 hover:bg-[#e8ddd1] hover:text-[#1f1b18]"
                >
                  Installation guide
                </Button>
              </Link>
              <Link href="/api-docs">
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-[#b8ab9c] bg-transparent px-6 hover:bg-[#e8ddd1] hover:text-[#1f1b18]"
                >
                  API reference
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-[1.9rem] border border-[#c7b8aa] bg-[#f4ede5] p-6 shadow-[0_22px_48px_-40px_rgba(31,27,24,0.35)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f1b18] text-[#f3eadf]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6f65]">
                  Recommended start
                </p>
                <h2 className="mt-1 font-display text-3xl text-[#1f1b18]">Reading order</h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { label: "1", title: "Quick Start", href: "/docs/quickstart" },
                { label: "2", title: "Installation", href: "/docs/installation" },
                { label: "3", title: "Deployment", href: "/docs/deployment" },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center justify-between rounded-[1.3rem] border border-[#d5c7ba] bg-[#fbf7f1] px-4 py-4 transition-colors hover:border-[#8d7e72]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f1b18] text-sm font-semibold text-[#f3eadf]">
                      {item.label}
                    </div>
                    <span className="font-semibold text-[#1f1b18]">{item.title}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#1f1b18]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {principles.map((principle) => (
          <div
            key={principle.title}
            className="rounded-[1.6rem] border border-[#c7b8aa] bg-[#f6efe7] p-6 shadow-[0_20px_40px_-38px_rgba(31,27,24,0.3)]"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#1f1b18]" />
              <h3 className="text-lg font-semibold text-[#1f1b18]">{principle.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-7 text-[#5b534b]">{principle.description}</p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7a6f65]">Pathways</p>
          <h2 className="mt-3 font-display text-4xl text-[#1f1b18]">Choose a working path</h2>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-[#5b534b]">
            The fastest way through the docs depends on whether you are bootstrapping the app, configuring customer
            systems, or taking it to production.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pathways.map((path) => {
            const Icon = path.icon;

            return (
              <Link
                key={path.title}
                href={path.href}
                className="group rounded-[1.75rem] border border-[#c7b8aa] bg-[#f4ede5] p-6 transition-all hover:-translate-y-1 hover:border-[#8d7e72] hover:shadow-[0_22px_50px_-40px_rgba(31,27,24,0.4)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f1b18] text-[#f3eadf]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-[#1f1b18]">{path.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5b534b]">{path.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-[#5b534b]">
                  {path.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#1f1b18]" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#1f1b18]">
                  Open guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7a6f65]">Reference</p>
          <h2 className="mt-3 font-display text-4xl text-[#1f1b18]">Core product systems</h2>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-[#5b534b]">
            These guides cover the systems that shape day-to-day product behavior: access, data, money, content,
            platform APIs, and AI.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.title}
                href={section.href}
                className="group rounded-[1.6rem] border border-[#c7b8aa] bg-[#f6efe7] p-6 transition-all hover:-translate-y-1 hover:border-[#8d7e72] hover:shadow-[0_20px_44px_-36px_rgba(31,27,24,0.35)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f1b18] text-[#f3eadf]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-[#1f1b18]">{section.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5b534b]">{section.description}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#1f1b18]">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2.2rem] border border-[#2b2521] bg-[#1f1b18] p-8 text-[#f3eadf]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b4a899]">Operational focus</p>
            <h2 className="mt-3 font-display text-4xl text-[#f3eadf]">
              When you are close to launch, move straight to deployment and API reference.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#d3c6b6]">
              Those two sections will usually surface the final integration gaps: production domains, callback URLs,
              webhook secrets, and the exact route shapes your product and admin tooling depend on.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/docs/deployment">
              <Button className="h-12 w-full rounded-full bg-[#f3eadf] px-6 text-[#1f1b18] hover:bg-[#e1d6ca]">
                <Cloud className="mr-2 h-4 w-4" />
                Deployment guide
              </Button>
            </Link>
            <Link href="/api-docs">
              <Button
                variant="outline"
                className="h-12 w-full rounded-full border-[#6b6259] bg-transparent px-6 text-[#f3eadf] hover:bg-[#2b2521] hover:text-[#f3eadf]"
              >
                <FileText className="mr-2 h-4 w-4" />
                API reference
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
