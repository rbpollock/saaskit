import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Bot,
  CreditCard,
  Users,
  BarChart3,
  Rocket,
  Lock,
  Code,
  Globe,
  Check,
  Star,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";

export default async function Home() {
  // Fetch plans for pricing section
  const plans = await prisma.plan.findMany({
    orderBy: { monthlyPrice: "asc" },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section with Animated Background */}
      <main className="flex-1 pt-16">
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 py-20 md:py-32 lg:py-40">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-pink-500/30 blur-3xl" />
            <div className="absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 h-80 w-80 animate-pulse rounded-full bg-purple-500/30 blur-3xl delay-500" />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>Production-Ready AI SaaS Platform</span>
              </div>

              {/* Heading */}
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Build AI Applications
                  <span className="block bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                    10x Faster
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-lg text-purple-100 md:text-xl">
                  The complete Next.js 15 starter kit with AI integration, authentication, billing, and admin dashboard. Ship your SaaS in days, not months.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    className="group bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-200 shadow-xl"
                  >
                    Start Building Free
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/api-docs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-200"
                  >
                    View API Docs
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-purple-200">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm">1000+ developers</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm">5.0 rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b bg-gradient-to-b from-background to-muted/50 py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "<100ms", label: "Response Time" },
                { value: "50+", label: "API Endpoints" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-primary md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section with Cards */}
        <section id="features" className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Everything You Need to Launch
              </h2>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                Production-ready features that scale with your business
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Bot,
                  title: "AI Integration",
                  description:
                    "Connect to 200+ AI models via OpenRouter. GPT-4, Claude, Gemini, Llama - all in one API.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Shield,
                  title: "Secure Authentication",
                  description:
                    "NextAuth v5 with OAuth (Google, GitHub) and email/password. RBAC with admin roles built-in.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: CreditCard,
                  title: "Stripe Billing",
                  description:
                    "Complete subscription management, webhooks, and payment processing. Credit-based system included.",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: BarChart3,
                  title: "Admin Dashboard",
                  description:
                    "Full CRUD operations for users, subscriptions, payments, and blog content. Analytics included.",
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: Code,
                  title: "REST API",
                  description:
                    "50+ documented endpoints with Swagger UI. Full CRUD for all resources with pagination and filters.",
                  gradient: "from-violet-500 to-purple-500",
                },
                {
                  icon: Globe,
                  title: "Blog System",
                  description:
                    "Built-in blog with categories, SEO optimization, and markdown support. Perfect for content marketing.",
                  gradient: "from-pink-500 to-rose-500",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`rounded-xl bg-gradient-to-br ${feature.gradient} p-3 shadow-lg`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.gradient} transition-all duration-300 group-hover:w-full`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="w-full bg-muted/50 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Built with Modern Tech
              </h2>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                Production-grade stack for scalability and performance
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                "Next.js 15",
                "React 19",
                "TypeScript",
                "Tailwind CSS v4",
                "Prisma ORM",
                "PostgreSQL",
                "NextAuth v5",
                "Stripe",
                "OpenRouter AI",
                "Swagger/OpenAPI",
                "shadcn/ui",
                "Zod Validation",
              ].map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg border bg-card p-4 shadow-sm"
                >
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                Choose the plan that fits your needs. Upgrade or downgrade anytime.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <div
                  key={plan.id}
                  className={`relative overflow-hidden rounded-2xl border-2 ${
                    i === 1
                      ? "border-primary shadow-2xl scale-105 bg-gradient-to-b from-primary/5 to-background"
                      : "border-border bg-card"
                  } p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                >
                  {i === 1 && (
                    <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      POPULAR
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">
                        ${plan.monthlyPrice.toFixed(0)}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>

                  <div className="mb-8 space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{plan.creditsPerMonth.toLocaleString()} AI credits/month</span>
                    </div>
                    {plan.features?.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/auth/signin">
                    <Button
                      className={`w-full ${
                        i === 1
                          ? "bg-primary hover:bg-primary/90"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                      size="lg"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-primary py-20 md:py-32">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Ready to Build Your AI SaaS?
                </h2>
                <p className="mx-auto max-w-[600px] text-lg text-primary-foreground/90">
                  Join thousands of developers shipping faster with our starter kit. Get started in minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 shadow-xl"
                  >
                    Start Free Trial
                    <Rocket className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  >
                    Read Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container px-4 py-12 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="hover:text-foreground transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Connect</h3>
              <div className="flex gap-4">
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2025 AI SaaS Starter Kit. Built with Next.js 15, Prisma, and TypeScript.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
                <Link href="/api-docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  API
                </Link>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
