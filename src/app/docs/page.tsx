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
  Sparkles,
  Github,
} from "lucide-react";
import { DocBadge } from "@/components/docs/doc-components";

export default function DocsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <DocBadge variant="purple">v1.0</DocBadge>
          <DocBadge variant="info">Updated Nov 2025</DocBadge>
        </div>
        <h1 className="text-5xl font-bold tracking-tight lg:text-6xl bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
          Documentation
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Welcome to the AI SaaS Starter Kit documentation. Learn how to build and deploy production-ready AI applications with Next.js 15, Prisma, and TypeScript.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/docs/quickstart">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/20">
              <Rocket className="mr-2 h-4 w-4" />
              Quick Start
            </Button>
          </Link>
          <Link href="https://github.com" target="_blank">
            <Button size="lg" variant="outline">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Start Card */}
      <div className="relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-indigo-500/10 p-8 lg:p-10 shadow-xl">
        <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30">
              <Rocket className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Quick Start</h2>
              <p className="text-sm text-muted-foreground mt-1">Ready in 5 minutes</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl text-lg leading-relaxed">
            Get your AI SaaS application up and running in less than 5 minutes. Follow our quick start guide to set up your development environment and deploy your first feature.
          </p>
          <Link href="/docs/quickstart">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">What's Included</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to build a production-ready SaaS application
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Authentication",
              description: "NextAuth v5 with OAuth providers and RBAC",
              href: "/docs/authentication",
              gradient: "from-blue-500 to-cyan-500",
              badge: "Security",
            },
            {
              icon: CreditCard,
              title: "Billing",
              description: "Stripe integration with subscriptions and webhooks",
              href: "/docs/billing",
              gradient: "from-purple-500 to-pink-500",
              badge: "Payments",
            },
            {
              icon: Code,
              title: "REST API",
              description: "50+ documented endpoints with Swagger UI",
              href: "/docs/api",
              gradient: "from-orange-500 to-red-500",
              badge: "API",
            },
            {
              icon: Database,
              title: "Database",
              description: "PostgreSQL with Prisma ORM and migrations",
              href: "/docs/database",
              gradient: "from-green-500 to-emerald-500",
              badge: "Data",
            },
            {
              icon: Zap,
              title: "AI Integration",
              description: "OpenRouter API with 200+ AI models",
              href: "/docs/ai",
              gradient: "from-yellow-500 to-orange-500",
              badge: "AI/ML",
            },
            {
              icon: BookOpen,
              title: "Blog System",
              description: "Built-in blog with categories and SEO",
              href: "/docs/blog",
              gradient: "from-pink-500 to-rose-500",
              badge: "Content",
            },
          ].map((feature: any) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group relative overflow-hidden rounded-2xl border-2 bg-card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/30"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3.5 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <DocBadge variant="default">{feature.badge}</DocBadge>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r ${feature.gradient} transition-all duration-300 group-hover:w-full`} />
            </Link>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Tech Stack</h2>
          <p className="text-muted-foreground text-lg">
            Built with modern, battle-tested technologies
          </p>
        </div>
        <div className="rounded-2xl border-2 bg-gradient-to-br from-muted/30 to-muted/10 p-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Next.js 15",
                description: "React framework with App Router",
                badge: "Frontend",
                icon: "⚡",
              },
              {
                name: "TypeScript",
                description: "Type-safe development",
                badge: "Language",
                icon: "📘",
              },
              {
                name: "Tailwind CSS",
                description: "Utility-first CSS framework",
                badge: "Styling",
                icon: "🎨",
              },
              {
                name: "Prisma",
                description: "Next-generation ORM",
                badge: "Database",
                icon: "🗄️",
              },
              {
                name: "PostgreSQL",
                description: "Powerful relational database",
                badge: "Database",
                icon: "🐘",
              },
              {
                name: "NextAuth v5",
                description: "Authentication for Next.js",
                badge: "Auth",
                icon: "🔐",
              },
              {
                name: "Stripe",
                description: "Payment processing",
                badge: "Payments",
                icon: "💳",
              },
              {
                name: "OpenRouter",
                description: "Unified AI API",
                badge: "AI",
                icon: "🤖",
              },
              {
                name: "shadcn/ui",
                description: "Beautiful UI components",
                badge: "Components",
                icon: "🎯",
              },
            ].map((tech) => (
              <div key={tech.name} className="space-y-2 group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tech.icon}</span>
                  <DocBadge variant="info">{tech.badge}</DocBadge>
                </div>
                <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{tech.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Additional Resources</h2>
          <p className="text-muted-foreground text-lg">
            Explore more tools and references
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/api-docs"
            className="group flex items-center justify-between rounded-2xl border-2 bg-card p-6 hover:bg-muted/50 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg group-hover:scale-110 transition-transform">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">API Reference</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Complete API documentation with Swagger UI
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            href="/blog"
            className="group flex items-center justify-between rounded-2xl border-2 bg-card p-6 hover:bg-muted/50 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Blog</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tutorials, guides, and announcements
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 lg:p-12 text-center shadow-2xl">
        <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Ready to build?</span>
          </div>
          <h2 className="text-4xl font-bold">Start Building Today</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join developers who are building production-ready SaaS applications with our comprehensive starter kit.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/docs/quickstart">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/30">
                <Rocket className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </Link>
            <Link href="/docs/installation">
              <Button size="lg" variant="outline">
                <BookOpen className="mr-2 h-5 w-5" />
                Read Installation Guide
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
