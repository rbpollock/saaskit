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
    <div className="light flex min-h-screen flex-col bg-white">
      <Navbar />

      {/* Hero Section - SaaS Pilot Style */}
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 pt-32 pb-20 md:pt-40 md:pb-32">
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl animate-pulse" />
            <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-purple-400/30 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-medium text-white">
                <Sparkles className="h-4 w-4" />
                <span>The #1 AI-Powered SaaS Starter Kit</span>
              </div>

              {/* Main Heading */}
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-tight">
                Build Your AI SaaS
                <span className="block bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  10x Faster
                </span>
              </h1>

              <p className="mx-auto mb-10 max-w-2xl text-xl text-purple-100 md:text-2xl leading-relaxed">
                The complete Next.js 15 starter kit with AI, authentication, payments, and admin dashboard. Ship your SaaS in days, not months.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    className="group h-14 px-8 text-lg font-semibold bg-white text-purple-600 hover:bg-purple-50 shadow-2xl hover:shadow-white/20 transition-all hover:scale-105"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-lg font-semibold border-2 border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/50"
                  >
                    View Documentation
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-purple-100">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">1000+ developers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">5.0 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-semibold">99.9% uptime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom curve */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 80L60 70C120 60 240 40 360 33.3C480 26.7 600 33.3 720 40C840 46.7 960 53.3 1080 50C1200 46.7 1320 33.3 1380 26.7L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 max-w-5xl mx-auto">
              {[
                { value: "99.9%", label: "Uptime", icon: Shield },
                { value: "<100ms", label: "Response", icon: Zap },
                { value: "50+", label: "API Routes", icon: Code },
                { value: "24/7", label: "Support", icon: Rocket },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 p-6 text-center transition-all hover:shadow-xl hover:-translate-y-2"
                >
                  <stat.icon className="mx-auto mb-3 h-10 w-10 text-purple-600" strokeWidth={1.5} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700">
                <Layers className="h-4 w-4" />
                Features
              </div>
              <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Everything You Need to Launch
              </h2>
              <p className="text-xl text-gray-600">
                Production-ready features that scale with your business
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Bot,
                  title: "AI Integration",
                  description: "Connect to 200+ AI models via OpenRouter. GPT-4, Claude, Gemini, Llama - all in one API.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Shield,
                  title: "Authentication",
                  description: "NextAuth v5 with OAuth (Google, GitHub) and email. Complete RBAC with admin roles.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: CreditCard,
                  title: "Stripe Payments",
                  description: "Full subscription management, webhooks, and payment processing with credits system.",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: BarChart3,
                  title: "Admin Dashboard",
                  description: "Complete CRUD for users, subscriptions, payments, and content. Analytics included.",
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: Code,
                  title: "REST API",
                  description: "50+ documented endpoints with Swagger UI. Full CRUD with pagination and filters.",
                  gradient: "from-violet-500 to-purple-500",
                },
                {
                  icon: Globe,
                  title: "Blog System",
                  description: "Built-in blog with categories, SEO optimization, and markdown support.",
                  gradient: "from-pink-500 to-rose-500",
                },
              ].map((feature: any, i: number) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
                >
                  {/* Icon with gradient background */}
                  <div className="mb-6">
                    <div className={`inline-flex rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Gradient accent on hover */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.gradient} transition-all duration-300 group-hover:w-full`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                <Code className="h-4 w-4" />
                Tech Stack
              </div>
              <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Built with Modern Tech
              </h2>
              <p className="text-xl text-gray-600">
                Production-grade stack for scalability and performance
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-4 text-center font-bold text-gray-900 transition-all hover:border-purple-500 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all" />
                  <span className="relative">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                <CreditCard className="h-4 w-4" />
                Pricing
              </div>
              <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600">
                Choose the plan that fits your needs. Upgrade anytime.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
              {plans.map((plan: any, i: number) => (
                <div
                  key={plan.id}
                  className={`relative overflow-hidden rounded-3xl border-2 p-8 transition-all hover:shadow-2xl hover:-translate-y-2 ${
                    i === 1
                      ? "border-purple-500 bg-gradient-to-b from-purple-50 to-white shadow-xl scale-105"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {i === 1 && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <div className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                        ⭐ MOST POPULAR
                      </div>
                    </div>
                  )}

                  <div className="mb-8 pt-4">
                    <h3 className="mb-3 text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-extrabold text-gray-900">
                        ${plan.monthlyPrice.toFixed(0)}
                      </span>
                      <span className="text-xl text-gray-600">/month</span>
                    </div>
                  </div>

                  <div className="mb-8 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 font-medium">
                        {plan.creditsPerMonth.toLocaleString()} AI credits/month
                      </span>
                    </div>
                    {plan.features?.map((feature: any, j: number) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-5 w-5 text-green-600" strokeWidth={3} />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/auth/signin">
                    <Button
                      className={`w-full h-12 text-base font-bold transition-all ${
                        i === 1
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                      }`}
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
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 py-20 md:py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Ready to Build Your SaaS?
              </h2>
              <p className="mb-10 text-xl text-purple-100 md:text-2xl">
                Join thousands of developers building faster. Get started in minutes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    className="group h-14 px-8 text-lg font-bold bg-white text-purple-600 hover:bg-purple-50 shadow-2xl hover:scale-105 transition-all"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-lg font-bold border-2 border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
                  >
                    View Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="container px-4 py-16 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900">Product</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="/pricing" className="hover:text-purple-600 transition-colors font-medium">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-purple-600 transition-colors font-medium">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="hover:text-purple-600 transition-colors font-medium">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-purple-600 transition-colors font-medium">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900">Company</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors font-medium">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors font-medium">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900">Legal</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors font-medium">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors font-medium">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900">Connect</h3>
              <div className="flex gap-3">
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white transition-all hover:scale-110 hover:shadow-lg"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white transition-all hover:scale-110 hover:shadow-lg"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white transition-all hover:scale-110 hover:shadow-lg"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                © 2025 AI SaaS Starter Kit. Built with Next.js 15 & TypeScript.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <Link href="/docs" className="hover:text-purple-600 transition-colors font-medium">
                  Docs
                </Link>
                <Link href="/api-docs" className="hover:text-purple-600 transition-colors font-medium">
                  API
                </Link>
                <Link href="/blog" className="hover:text-purple-600 transition-colors font-medium">
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
