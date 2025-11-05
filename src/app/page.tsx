import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Bot,
  CreditCard,
  BarChart3,
  Rocket,
  Code,
  Globe,
  Check,
  Star,
  Github,
  Twitter,
  Linkedin,
  Play,
  TrendingUp,
  Layers,
  Zap as Lightning,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";

export default async function Home() {
  // Fetch plans for pricing section
  const plans = await prisma.plan.findMany({
    orderBy: { monthlyPrice: "asc" },
  });

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />

      {/* Hero Section with Enhanced Animated Background */}
      <main className="flex-1 pt-16">
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 animate-gradient py-24 md:py-32 lg:py-44">
          {/* Enhanced animated background with grid */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <div className="absolute -left-4 top-1/4 h-96 w-96 animate-float rounded-full bg-pink-500/30 blur-3xl" />
            <div className="absolute right-1/4 top-1/3 h-[500px] w-[500px] animate-float rounded-full bg-blue-500/20 blur-3xl" style={{ animationDelay: "2000ms" }} />
            <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] animate-float rounded-full bg-purple-500/30 blur-3xl" style={{ animationDelay: "1000ms" }} />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-10 text-center">
              {/* Badge with shimmer effect */}
              <div className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-smooth hover:bg-white/20 hover:scale-105 glass">
                <Sparkles className="h-4 w-4 animate-glow" />
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Production-Ready AI SaaS Platform
                </span>
              </div>

              {/* Heading with better typography */}
              <div className="space-y-6 max-w-5xl">
                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-tight">
                  Build AI Applications
                  <span className="block mt-2 bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent animate-gradient">
                    10x Faster
                  </span>
                </h1>
                <p className="mx-auto max-w-[750px] text-xl text-purple-100/90 md:text-2xl font-light leading-relaxed">
                  The complete Next.js 15 starter kit with AI integration, authentication, billing, and admin dashboard. Ship your SaaS in days, not months.
                </p>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/50 px-8 py-6 text-lg font-semibold"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Building Free
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group border-2 border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    View Documentation
                  </Button>
                </Link>
              </div>

              {/* Enhanced Social Proof */}
              <div className="flex flex-wrap items-center justify-center gap-10 pt-10 text-purple-200">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="flex -space-x-3">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400 group-hover:scale-110 transition-transform"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">1000+ developers</div>
                    <div className="text-xs text-purple-300">Building with us</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">5.0 rating</div>
                    <div className="text-xs text-purple-300">From our users</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">99.9% uptime</div>
                    <div className="text-xs text-purple-300">Always available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-background"/>
            </svg>
          </div>
        </section>

        {/* Stats Section with Cards */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { value: "99.9%", label: "Uptime", icon: Shield },
                { value: "<100ms", label: "Response Time", icon: Lightning },
                { value: "50+", label: "API Endpoints", icon: Code },
                { value: "24/7", label: "Support", icon: Rocket },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-xl transition-smooth hover:-translate-y-2 hover:border-primary/50"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <stat.icon className="h-8 w-8 mb-4 text-primary group-hover:scale-110 transition-smooth" />
                  <div className="relative z-10 text-center">
                    <div className="text-4xl font-bold gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section with Enhanced Cards */}
        <section id="features" className="w-full py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Layers className="h-4 w-4" />
                Features
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                Everything You Need to Launch
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Production-ready features that scale with your business
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Bot,
                  title: "AI Integration",
                  description:
                    "Connect to 200+ AI models via OpenRouter. GPT-4, Claude, Gemini, Llama - all in one unified API.",
                  gradient: "from-blue-500 via-cyan-500 to-blue-600",
                },
                {
                  icon: Shield,
                  title: "Secure Authentication",
                  description:
                    "NextAuth v5 with OAuth (Google, GitHub) and email/password. Complete RBAC with admin roles built-in.",
                  gradient: "from-purple-500 via-pink-500 to-purple-600",
                },
                {
                  icon: CreditCard,
                  title: "Stripe Billing",
                  description:
                    "Complete subscription management, webhooks, and payment processing. Credit-based system included.",
                  gradient: "from-orange-500 via-red-500 to-orange-600",
                },
                {
                  icon: BarChart3,
                  title: "Admin Dashboard",
                  description:
                    "Full CRUD operations for users, subscriptions, payments, and blog content. Analytics included.",
                  gradient: "from-green-500 via-emerald-500 to-green-600",
                },
                {
                  icon: Code,
                  title: "REST API",
                  description:
                    "50+ documented endpoints with Swagger UI. Full CRUD for all resources with pagination and filters.",
                  gradient: "from-violet-500 via-purple-500 to-violet-600",
                },
                {
                  icon: Globe,
                  title: "Blog System",
                  description:
                    "Built-in blog with categories, SEO optimization, and markdown support. Perfect for content marketing.",
                  gradient: "from-pink-500 via-rose-500 to-pink-600",
                },
              ].map((feature: any, i: number) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:shadow-2xl transition-smooth hover:-translate-y-3 hover:border-primary/50"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {/* Gradient hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer" />

                  <div className="relative z-10">
                    <div className="mb-6">
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-smooth`}
                      >
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r ${feature.gradient} transition-all duration-500 group-hover:w-full`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section with Better Design */}
        <section className="w-full bg-muted/50 py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Code className="h-4 w-4" />
                Tech Stack
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Built with Modern Tech
              </h2>
              <p className="text-xl text-muted-foreground">
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
                  className="group flex items-center gap-3 rounded-xl border bg-card p-5 hover:shadow-lg hover:border-primary/50 transition-smooth hover:-translate-y-2 hover:scale-105"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-glow group-hover:scale-150 transition-smooth" />
                  </div>
                  <span className="font-semibold text-foreground group-hover:gradient-text transition-colors">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section with Enhanced Design */}
        <section className="w-full py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <CreditCard className="h-4 w-4" />
                Pricing
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-muted-foreground">
                Choose the plan that fits your needs. Upgrade or downgrade anytime.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {plans.map((plan: any, i: number) => (
                <div
                  key={plan.id}
                  className={`group relative overflow-hidden rounded-3xl border-2 ${
                    i === 1
                      ? "border-primary shadow-2xl shadow-primary/20 scale-105 bg-gradient-to-b from-primary/5 via-background to-background animate-gradient"
                      : "border-border bg-card hover:border-primary/50"
                  } p-8 transition-smooth hover:shadow-2xl hover:-translate-y-3 hover:scale-105`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity" />

                  {i === 1 && (
                    <div className="absolute -right-12 top-8 rotate-45 bg-gradient-to-r from-primary to-purple-600 px-16 py-2 text-xs font-bold text-primary-foreground shadow-lg animate-shimmer">
                      POPULAR
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8 relative z-10">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-6xl font-bold ${i === 1 ? 'gradient-text' : ''}`}>
                        ${plan.monthlyPrice.toFixed(0)}
                      </span>
                      <span className="text-lg text-muted-foreground">/month</span>
                    </div>
                  </div>

                  <div className="mb-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="font-medium">{plan.creditsPerMonth.toLocaleString()} AI credits/month</span>
                    </div>
                    {plan.features?.map((feature: any, j: number) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/auth/signin" className="relative z-10">
                    <Button
                      className={`w-full py-6 text-base font-semibold transition-smooth ${
                        i === 1
                          ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl hover:scale-105"
                          : "bg-muted hover:bg-muted/80 hover:scale-105"
                      }`}
                      size="lg"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with Enhanced Design */}
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 animate-gradient py-24 md:py-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 h-96 w-96 animate-float rounded-full bg-pink-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-96 w-96 animate-float rounded-full bg-blue-500/20 blur-3xl" style={{ animationDelay: "3000ms" }} />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-10 text-center max-w-4xl mx-auto">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
                  Ready to Build Your
                  <span className="block mt-2 bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                    AI SaaS?
                  </span>
                </h2>
                <p className="mx-auto max-w-[650px] text-xl text-purple-100/90 leading-relaxed">
                  Join thousands of developers shipping faster with our starter kit. Get started in minutes with comprehensive documentation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-white text-purple-600 hover:bg-purple-50 shadow-2xl hover:scale-105 transition-smooth px-8 py-6 text-lg font-semibold"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center">
                      <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass border-2 border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-smooth px-8 py-6 text-lg font-semibold"
                  >
                    Read Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t bg-muted/50 backdrop-blur-sm">
        <div className="container px-4 py-16 md:px-6">
          <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-6 text-lg font-bold">Product</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors hover:underline">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors hover:underline">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="hover:text-foreground transition-colors hover:underline">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground transition-colors hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-lg font-bold">Company</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-lg font-bold">Legal</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors hover:underline">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-lg font-bold">Connect</h3>
              <div className="flex gap-3">
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-muted hover:bg-gradient-to-br hover:from-primary hover:to-purple-600 hover:text-primary-foreground transition-smooth hover:scale-110 hover:rotate-6"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-muted hover:bg-gradient-to-br hover:from-primary hover:to-purple-600 hover:text-primary-foreground transition-smooth hover:scale-110 hover:rotate-6"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-muted hover:bg-gradient-to-br hover:from-primary hover:to-purple-600 hover:text-primary-foreground transition-smooth hover:scale-110 hover:rotate-6"
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
              <div className="flex items-center gap-6">
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
