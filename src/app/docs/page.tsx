import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Rocket,
  BookOpen,
  Code,
  Zap,
  Shield,
  CreditCard,
  Database,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Documentation
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Welcome to the AI SaaS Starter Kit documentation. Learn how to build and deploy production-ready AI applications with Next.js 15, Prisma, and TypeScript.
        </p>
      </div>

      {/* Quick Start Card */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-indigo-500/10 p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Quick Start</h2>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Get your AI SaaS application up and running in less than 5 minutes. Follow our quick start guide to set up your development environment and deploy your first feature.
          </p>
          <Link href="/docs/quickstart">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">What's Included</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Authentication",
              description: "NextAuth v5 with OAuth providers and RBAC",
              href: "/docs/authentication",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: CreditCard,
              title: "Billing",
              description: "Stripe integration with subscriptions and webhooks",
              href: "/docs/billing",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: Code,
              title: "REST API",
              description: "50+ documented endpoints with Swagger UI",
              href: "/docs/api",
              gradient: "from-orange-500 to-red-500",
            },
            {
              icon: Database,
              title: "Database",
              description: "PostgreSQL with Prisma ORM and migrations",
              href: "/docs/database",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              icon: Zap,
              title: "AI Integration",
              description: "OpenRouter API with 200+ AI models",
              href: "/docs/ai",
              gradient: "from-yellow-500 to-orange-500",
            },
            {
              icon: BookOpen,
              title: "Blog System",
              description: "Built-in blog with categories and SEO",
              href: "/docs/blog",
              gradient: "from-pink-500 to-rose-500",
            },
          ].map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group relative overflow-hidden rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.gradient} transition-all duration-300 group-hover:w-full`} />
            </Link>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Tech Stack</h2>
        <div className="rounded-xl border bg-muted/50 p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Next.js 15", description: "React framework with App Router" },
              { name: "TypeScript", description: "Type-safe development" },
              { name: "Tailwind CSS", description: "Utility-first CSS framework" },
              { name: "Prisma", description: "Next-generation ORM" },
              { name: "PostgreSQL", description: "Powerful relational database" },
              { name: "NextAuth v5", description: "Authentication for Next.js" },
              { name: "Stripe", description: "Payment processing" },
              { name: "OpenRouter", description: "Unified AI API" },
              { name: "shadcn/ui", description: "Beautiful UI components" },
            ].map((tech) => (
              <div key={tech.name} className="space-y-1">
                <h4 className="font-semibold">{tech.name}</h4>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Additional Resources</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/api-docs"
            className="flex items-center justify-between rounded-lg border bg-card p-4 hover:bg-muted transition-colors"
          >
            <div>
              <h4 className="font-semibold mb-1">API Reference</h4>
              <p className="text-sm text-muted-foreground">
                Complete API documentation with Swagger UI
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Link>
          <Link
            href="/blog"
            className="flex items-center justify-between rounded-lg border bg-card p-4 hover:bg-muted transition-colors"
          >
            <div>
              <h4 className="font-semibold mb-1">Blog</h4>
              <p className="text-sm text-muted-foreground">
                Tutorials, guides, and announcements
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </div>
  );
}
