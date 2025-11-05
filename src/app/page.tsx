import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Sparkles,
  Shield,
  Zap,
  Bot,
  CreditCard,
  BarChart3,
  Code,
  Globe,
  Check,
  Star,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  Layers,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";

export default async function Home() {
  // Fetch plans for pricing section
  const plans = await prisma.plan.findMany({
    orderBy: { monthlyPrice: "asc" },
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* Hero Section - OpenSaaS Inspired */}
      <main className="flex-1">
        <section className="relative w-full overflow-hidden border-b bg-gradient-to-b from-background to-muted/20 py-20 md:py-28 lg:py-36">
          {/* Minimal background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto flex max-w-5xl flex-col items-center space-y-8 text-center">
              {/* Simple badge */}
              <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <Sparkles size={16} className="text-primary" />
                <span>Production-Ready AI SaaS Platform</span>
              </div>

              {/* Bold heading - OpenSaaS style */}
              <div className="space-y-6">
                <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
                  Build & Ship Your
                  <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI SaaS in Days
                  </span>
                </h1>
                <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl lg:text-2xl font-normal leading-relaxed">
                  The complete Next.js 15 starter kit with AI, authentication, payments, and admin dashboard.
                  Everything you need to launch fast.
                </p>
              </div>

              {/* Clean CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    className="group h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started Free
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-base font-semibold hover:bg-muted"
                  >
                    View Docs
                  </Button>
                </Link>
              </div>

              {/* Social Proof - Clean style */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-primary to-purple-600"
                      />
                    ))}
                  </div>
                  <span className="font-medium">1000+ developers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <span className="font-medium">5.0 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-medium">99.9% uptime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Clean Cards */}
        <section className="border-b bg-background py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {[
                { value: "99.9%", label: "Uptime", icon: Shield },
                { value: "<100ms", label: "Response", icon: Zap },
                { value: "50+", label: "API Routes", icon: Code },
                { value: "24/7", label: "Support", icon: Rocket },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <stat.icon size={32} className="mx-auto mb-3 text-primary" strokeWidth={1.5} />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - OpenSaaS Style */}
        <section className="border-b bg-muted/30 py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Layers size={16} strokeWidth={1.5} />
                Features
              </div>
              <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Everything You Need
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Production-ready features that scale with your business
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Bot,
                  title: "AI Integration",
                  description:
                    "Connect to 200+ AI models via OpenRouter. GPT-4, Claude, Gemini, Llama - all in one API.",
                },
                {
                  icon: Shield,
                  title: "Authentication",
                  description:
                    "NextAuth v5 with OAuth (Google, GitHub) and email. Complete RBAC with admin roles.",
                },
                {
                  icon: CreditCard,
                  title: "Stripe Payments",
                  description:
                    "Full subscription management, webhooks, and payment processing with credits system.",
                },
                {
                  icon: BarChart3,
                  title: "Admin Dashboard",
                  description:
                    "Complete CRUD for users, subscriptions, payments, and content. Analytics included.",
                },
                {
                  icon: Code,
                  title: "REST API",
                  description:
                    "50+ documented endpoints with Swagger UI. Full CRUD with pagination and filters.",
                },
                {
                  icon: Globe,
                  title: "Blog System",
                  description:
                    "Built-in blog with categories, SEO optimization, and markdown support.",
                },
              ].map((feature: any, i: number) => (
                <div
                  key={i}
                  className="group rounded-2xl border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="mb-5">
                    <div className="inline-flex rounded-xl bg-primary/10 p-3">
                      <feature.icon size={28} className="text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack - Simple Grid */}
        <section className="border-b bg-background py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Code size={16} strokeWidth={1.5} />
                Tech Stack
              </div>
              <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Modern Technologies
              </h2>
              <p className="text-lg text-muted-foreground">
                Built with the latest and most powerful tools
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  className="flex items-center justify-center rounded-lg border bg-card px-4 py-3 text-center font-semibold transition-all hover:border-primary/50 hover:shadow-md"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section - Clean Design */}
        <section className="border-b bg-muted/30 py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <CreditCard size={16} strokeWidth={1.5} />
                Pricing
              </div>
              <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Simple Pricing
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Choose the plan that fits your needs. Cancel anytime.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan: any, i: number) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl border-2 p-8 ${
                    i === 1
                      ? "border-primary bg-card shadow-xl"
                      : "border-border bg-card"
                  }`}
                >
                  {i === 1 && (
                    <div className="mb-4 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
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

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <Check size={20} className="text-green-600 flex-shrink-0" strokeWidth={2} />
                      <span>{plan.creditsPerMonth.toLocaleString()} AI credits/month</span>
                    </div>
                    {plan.features?.map((feature: any, j: number) => (
                      <div key={j} className="flex items-center gap-3">
                        <Check size={20} className="text-green-600 flex-shrink-0" strokeWidth={2} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/auth/signin">
                    <Button
                      className={`w-full h-11 text-base font-semibold ${
                        i === 1
                          ? "bg-primary hover:bg-primary/90 shadow-md"
                          : ""
                      }`}
                      variant={i === 1 ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Simple & Clean */}
        <section className="border-b bg-background py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-4xl flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Ready to Ship Your SaaS?
                </h2>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Join thousands of developers building faster. Get started in minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    className="group h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl"
                  >
                    <Rocket size={20} className="mr-2" strokeWidth={1.5} />
                    Start Free Trial
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-base font-semibold"
                  >
                    Read Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Clean & Simple */}
      <footer className="border-t bg-muted/30">
        <div className="container px-4 py-16 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-bold">Product</h3>
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
              <h3 className="mb-4 font-bold">Company</h3>
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
              <h3 className="mb-4 font-bold">Legal</h3>
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
              <h3 className="mb-4 font-bold">Connect</h3>
              <div className="flex gap-3">
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border bg-background p-2 transition-colors hover:bg-muted"
                  aria-label="Twitter"
                >
                  <Twitter size={20} strokeWidth={1.5} />
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border bg-background p-2 transition-colors hover:bg-muted"
                  aria-label="GitHub"
                >
                  <Github size={20} strokeWidth={1.5} />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border bg-background p-2 transition-colors hover:bg-muted"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>
                © 2025 AI SaaS Starter Kit. Built with Next.js 15 & TypeScript.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Docs
                </Link>
                <Link href="/api-docs" className="hover:text-foreground transition-colors">
                  API
                </Link>
                <Link href="/blog" className="hover:text-foreground transition-colors">
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
