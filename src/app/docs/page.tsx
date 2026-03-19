import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code,
  CreditCard,
  Database,
  Github,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocBadge } from "@/components/docs/doc-components";

const sections = [
  {
    title: "Authentication",
    description: "NextAuth, verification, and role boundaries.",
    href: "/docs/authentication",
    icon: Shield,
  },
  {
    title: "Billing",
    description: "Stripe plans, subscriptions, and credits.",
    href: "/docs/billing",
    icon: CreditCard,
  },
  {
    title: "API",
    description: "Documented routes and integration patterns.",
    href: "/docs/api",
    icon: Code,
  },
  {
    title: "Database",
    description: "Prisma structure, migrations, and data model notes.",
    href: "/docs/database",
    icon: Database,
  },
  {
    title: "AI Integration",
    description: "Model access and action wiring through OpenRouter.",
    href: "/docs/ai",
    icon: Zap,
  },
  {
    title: "Blog System",
    description: "Content management, categories, and public publishing.",
    href: "/docs/blog",
    icon: BookOpen,
  },
];

export default function DocsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <DocBadge variant="default">v1.0</DocBadge>
          <DocBadge variant="info">Updated 2026</DocBadge>
        </div>
        <div className="space-y-5">
          <h1 className="font-display text-5xl leading-[0.98] text-[#1f1b18] lg:text-6xl">
            Documentation for a calmer, production-ready SaaS foundation.
          </h1>
          <p className="max-w-3xl text-xl leading-8 text-[#5b534b]">
            Use the guides below to move through setup, billing, authentication, AI integration, and deployment without losing the design coherence of the main product.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/docs/quickstart">
            <Button className="h-12 rounded-full bg-[#1f1b18] px-6 text-[#f3eadf] hover:bg-[#312a25]">
              <Rocket className="mr-2 h-4 w-4" />
              Quick Start
            </Button>
          </Link>
          <Link href="https://github.com" target="_blank">
            <Button
              variant="outline"
              className="h-12 rounded-full border-[#b8ab9c] bg-transparent px-6 hover:bg-[#e8ddd1] hover:text-[#1f1b18]"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#c7b8aa] bg-[#efe6dc] p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1b18] text-[#f3eadf]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-3xl text-[#1f1b18]">Start here</h2>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-[#5b534b]">
              The documentation now uses the same premium neutral language as the public site: solid surfaces, warm contrast, and simpler hierarchy.
            </p>
            <Link href="/docs/quickstart" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#1f1b18]">
              Open quick start
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <h2 className="font-display text-4xl text-[#1f1b18]">Core sections</h2>
          <p className="mt-3 text-lg text-[#5b534b]">
            The main guides you will use most often while shaping the product.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.title}
                href={section.href}
                className="group rounded-[1.6rem] border border-[#c7b8aa] bg-[#f4ede5] p-6 transition-all hover:-translate-y-1 hover:border-[#8c7e71] hover:shadow-[0_20px_44px_-36px_rgba(31,27,24,0.45)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1b18] text-[#f3eadf]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-[#1f1b18]">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5b534b]">
                  {section.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#1f1b18]">
                  Open
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-8 text-[#f3eadf]">
        <h2 className="font-display text-4xl">Continue from here</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#d3c6b6]">
          If you are setting up the project for the first time, start with installation and quick start. If the product is already running, move into billing, API, and deployment.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/docs/installation">
            <Button className="h-12 rounded-full bg-[#f3eadf] px-6 text-[#1f1b18] hover:bg-[#e1d6ca]">
              Installation Guide
            </Button>
          </Link>
          <Link href="/api-docs">
            <Button
              variant="outline"
              className="h-12 rounded-full border-[#6b6259] bg-transparent px-6 text-[#f3eadf] hover:bg-[#2b2521] hover:text-[#f3eadf]"
            >
              API Reference
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
