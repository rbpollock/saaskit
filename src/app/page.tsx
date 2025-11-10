"use client";

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
  Lock,
  Database,
  Cloud,
  Mail,
  Users,
  TrendingUp,
  MessageSquare,
  ChevronDown,
  Play,
  Award,
  Target,
  Lightbulb,
  X,
  Infinity,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useEffect, useState, useRef } from "react";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-extrabold">
      {count}
      {suffix}
    </div>
  );
}

// Testimonial data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Founder at TechStart",
    image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff&size=128",
    content: "This starter kit saved us 3 months of development time. The AI integration is seamless and the code quality is exceptional.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO at DataFlow",
    image: "https://ui-avatars.com/api/?name=Michael+Chen&background=3b82f6&color=fff&size=128",
    content: "The best SaaS starter I've used. Authentication, payments, and admin dashboard work flawlessly out of the box.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Lead Developer at CloudSync",
    image: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=ec4899&color=fff&size=128",
    content: "Incredible documentation and support. We launched our MVP in just 2 weeks using this kit. Highly recommended!",
    rating: 5,
  },
];

// FAQ data
const faqs = [
  {
    question: "What's included in the starter kit?",
    answer: "The kit includes Next.js 15 setup, authentication with NextAuth v5, Stripe payment integration, admin dashboard, 50+ API endpoints, AI integration via OpenRouter, blog system, and comprehensive documentation.",
  },
  {
    question: "Can I use this for commercial projects?",
    answer: "Yes! Once you purchase the starter kit, you can use it for unlimited commercial projects. There are no restrictions on what you build.",
  },
  {
    question: "What AI models are supported?",
    answer: "Through OpenRouter integration, you get access to 200+ AI models including GPT-4, Claude, Gemini, Llama, and many more. Switch between models easily.",
  },
  {
    question: "Do you provide support and updates?",
    answer: "Yes! We provide ongoing support, regular updates, and maintain compatibility with the latest versions of Next.js, React, and other dependencies.",
  },
  {
    question: "Is the code customizable?",
    answer: "Absolutely! You get full access to the source code. Customize everything to match your brand and requirements. No vendor lock-in.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState("");

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      {/* Hero Section - Ultra Modern with 3D Effects */}
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 pt-32 pb-20 md:pt-48 md:pb-40">
          {/* Animated mesh gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-purple-500/30 blur-3xl animate-pulse"
              style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
            />
            <div
              className="absolute top-1/3 -left-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/30 blur-3xl animate-pulse"
              style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`, animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-0 right-1/3 h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-3xl animate-pulse"
              style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`, animationDelay: "2s" }}
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <div className="text-center lg:text-left space-y-8">
                  {/* Floating badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white shadow-2xl animate-fade-in-up">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-400">
                      <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span>Trusted by 10,000+ Developers</span>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>

                  {/* Main Heading with gradient */}
                  <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    Build Your
                    <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                      AI SaaS Empire
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    Ship production-ready SaaS products in days, not months. Complete Next.js 15 starter with AI, payments, auth, and analytics.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <Link href="/auth/signin">
                      <Button
                        size="lg"
                        className="group relative h-16 px-10 text-lg font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 bg-[length:200%_auto] animate-gradient border-0"
                      >
                        <Rocket className="mr-2 h-6 w-6" />
                        Start Building Free
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="#demo">
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-16 px-10 text-lg font-bold border-2 border-white/30 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20 hover:border-white/50 shadow-xl"
                      >
                        <Play className="mr-2 h-5 w-5" />
                        Watch Demo
                      </Button>
                    </Link>
                  </div>

                  {/* Social Proof */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-blue-100 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="h-10 w-10 rounded-full border-2 border-purple-900 bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg"
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold">10,000+ users</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-bold ml-1">5.0 (200+ reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Right side - 3D Floating Cards */}
                <div className="hidden lg:block relative h-[600px]">
                  {/* Floating feature cards with 3D effect */}
                  <div className="absolute top-0 right-0 w-72 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-float">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">Lightning Fast</div>
                        <div className="text-blue-200 text-sm">Next.js 15 + React 19</div>
                      </div>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div className="absolute top-32 right-12 w-64 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-float" style={{ animationDelay: "1s" }}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">AI Powered</div>
                        <div className="text-blue-200 text-sm">200+ Models</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {["GPT-4", "Claude", "Gemini"].map((model, i) => (
                        <div key={i} className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                          {model}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-32 right-0 w-60 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-float" style={{ animationDelay: "2s" }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-white font-bold">Revenue</div>
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">$24.5K</div>
                    <div className="text-green-400 text-sm font-semibold">+23.5% this month</div>
                  </div>

                  <div className="absolute bottom-0 right-20 w-56 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-float" style={{ animationDelay: "0.5s" }}>
                    <div className="flex items-center gap-3">
                      <Shield className="h-10 w-10 text-green-400" />
                      <div>
                        <div className="text-white font-bold text-lg">99.9% Uptime</div>
                        <div className="text-green-400 text-sm font-semibold">Enterprise Ready</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Bento Grid Features Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-5 py-2 text-sm font-bold text-purple-700">
                <Layers className="h-4 w-4" />
                <span>Complete SaaS Platform</span>
              </div>
              <h2 className="mb-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Everything you need.
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Nothing you don't.
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Production-ready features that scale from MVP to enterprise
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Large Card - AI Integration */}
              <div className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 p-10 text-white shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="inline-flex p-4 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 group-hover:scale-110 transition-transform">
                    <Bot className="h-12 w-12" />
                  </div>
                  <h3 className="text-4xl font-black mb-4">AI Integration</h3>
                  <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-xl">
                    Access 200+ AI models including GPT-4, Claude, Gemini, and Llama through a unified OpenRouter API. Switch models instantly without code changes.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm font-semibold">GPT-4 Turbo</div>
                    <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm font-semibold">Claude 3.5</div>
                    <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm font-semibold">Gemini Pro</div>
                    <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm font-semibold">Llama 3</div>
                  </div>
                </div>
              </div>

              {/* Authentication */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-[1.02]">
                <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-4 group-hover:scale-110 transition-transform">
                  <Lock className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-3">Secure Auth</h3>
                <p className="text-purple-100 leading-relaxed">
                  NextAuth v5 with OAuth (Google, GitHub) and email. Complete RBAC system.
                </p>
              </div>

              {/* Payments */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-8 text-white shadow-xl hover:shadow-orange-500/50 transition-all hover:scale-[1.02]">
                <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-3">Stripe Payments</h3>
                <p className="text-orange-100 leading-relaxed">
                  Full subscription management with webhooks and credits system.
                </p>
              </div>

              {/* Admin Dashboard */}
              <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500 p-8 text-white shadow-xl hover:shadow-green-500/50 transition-all hover:scale-[1.02]">
                <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-10 w-10" />
                </div>
                <h3 className="text-3xl font-black mb-4">Admin Dashboard</h3>
                <p className="text-xl text-green-100 leading-relaxed mb-6 max-w-2xl">
                  Complete CRUD for users, subscriptions, payments, and content. Real-time analytics and charts powered by Recharts.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm">
                    <Users className="h-6 w-6 mb-2" />
                    <div className="text-2xl font-bold">2.4K</div>
                    <div className="text-sm text-green-100">Users</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    <div className="text-2xl font-bold">$12K</div>
                    <div className="text-sm text-green-100">Revenue</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm">
                    <Target className="h-6 w-6 mb-2" />
                    <div className="text-2xl font-bold">94%</div>
                    <div className="text-sm text-green-100">Growth</div>
                  </div>
                </div>
              </div>

              {/* API */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-purple-500 p-8 text-white shadow-xl hover:shadow-violet-500/50 transition-all hover:scale-[1.02]">
                <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-4 group-hover:scale-110 transition-transform">
                  <Code className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-3">50+ API Routes</h3>
                <p className="text-purple-100 leading-relaxed">
                  RESTful API with Swagger docs. Full CRUD with pagination.
                </p>
              </div>

              {/* Database */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white shadow-xl hover:shadow-blue-500/50 transition-all hover:scale-[1.02]">
                <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-4 group-hover:scale-110 transition-transform">
                  <Database className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-3">Prisma + PostgreSQL</h3>
                <p className="text-blue-100 leading-relaxed">
                  Type-safe database access with modern ORM and migrations.
                </p>
              </div>

              {/* Blog System */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 p-8 text-white shadow-xl hover:shadow-pink-500/50 transition-all hover:scale-[1.02]">
                <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-3">Blog & CMS</h3>
                <p className="text-pink-100 leading-relaxed">
                  Built-in blog with SEO optimization and markdown support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Statistics */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Trusted by developers worldwide
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands who've shipped faster with our platform
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="mb-3 text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
                  <AnimatedCounter end={10000} suffix="+" />
                </div>
                <div className="text-gray-600 font-semibold text-lg">Active Users</div>
              </div>
              <div className="text-center group">
                <div className="mb-3 text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <div className="text-gray-600 font-semibold text-lg">Products Launched</div>
              </div>
              <div className="text-center group">
                <div className="mb-3 text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
                  <AnimatedCounter end={99} suffix=".9%" />
                </div>
                <div className="text-gray-600 font-semibold text-lg">Uptime SLA</div>
              </div>
              <div className="text-center group">
                <div className="mb-3 text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <div className="text-gray-600 font-semibold text-lg">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Showcase */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700">
                <Code className="h-4 w-4" />
                <span>Modern Tech Stack</span>
              </div>
              <h2 className="mb-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Built with the best tools
              </h2>
              <p className="text-xl text-gray-600">
                Production-grade stack for performance and scalability
              </p>
            </div>

            <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[
                { name: "Next.js 15", color: "from-black to-gray-800" },
                { name: "React 19", color: "from-blue-500 to-cyan-500" },
                { name: "TypeScript", color: "from-blue-600 to-blue-700" },
                { name: "Tailwind CSS v4", color: "from-cyan-500 to-blue-500" },
                { name: "Prisma ORM", color: "from-indigo-600 to-purple-600" },
                { name: "PostgreSQL", color: "from-blue-700 to-indigo-700" },
                { name: "NextAuth v5", color: "from-purple-600 to-pink-600" },
                { name: "Stripe", color: "from-purple-500 to-indigo-500" },
                { name: "OpenRouter", color: "from-green-500 to-emerald-500" },
                { name: "Swagger", color: "from-green-600 to-teal-600" },
                { name: "shadcn/ui", color: "from-gray-800 to-gray-900" },
                { name: "Zod", color: "from-blue-600 to-purple-600" },
              ].map((tech, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-6 text-center font-bold text-gray-900 transition-all hover:border-transparent hover:shadow-2xl hover:scale-110 hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <span className="relative group-hover:text-white transition-colors text-sm md:text-base">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-sm font-bold text-emerald-700">
                <CreditCard className="h-4 w-4" />
                <span>Simple Pricing</span>
              </div>
              <h2 className="mb-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Choose your perfect plan
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Start free, scale as you grow. No hidden fees, cancel anytime.
              </p>
            </div>

            <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div className="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 p-8 shadow-lg hover:shadow-2xl hover:border-purple-300 transition-all hover:-translate-y-2 flex flex-col">
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Starter</h3>
                    <p className="text-gray-600">Perfect for trying out</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-gray-900">$0</span>
                      <span className="text-xl text-gray-600">/month</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Free forever</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm">1,000 AI credits/month</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm">Basic AI models (GPT-3.5)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm">5 projects</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm">Email support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm">Community access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-100">
                        <X className="h-3.5 w-3.5 text-red-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400 text-sm line-through">Advanced AI models</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-100">
                        <X className="h-3.5 w-3.5 text-red-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400 text-sm line-through">Priority support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-100">
                        <X className="h-3.5 w-3.5 text-red-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400 text-sm line-through">Custom integrations</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-100">
                        <X className="h-3.5 w-3.5 text-red-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400 text-sm line-through">API access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-100">
                        <X className="h-3.5 w-3.5 text-red-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400 text-sm line-through">White-label solution</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-100">
                        <X className="h-3.5 w-3.5 text-red-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400 text-sm line-through">Dedicated account manager</span>
                    </div>
                  </div>
                </div>

                <Link href="/auth/signin" className="mt-auto">
                  <Button className="w-full h-12 text-base font-bold bg-gray-900 hover:bg-gray-800 text-white">
                    Get Started Free
                  </Button>
                </Link>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-gray-600" />
              </div>

              {/* Professional Plan - Most Popular */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-purple-50 to-white border-2 border-purple-500 p-8 shadow-2xl hover:shadow-purple-500/50 transition-all hover:-translate-y-2 flex flex-col md:scale-105">
                {/* Most Popular Badge */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <div className="relative">
                    <div className="rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-6 py-2 text-xs font-black text-white shadow-xl animate-gradient bg-[length:200%_auto]">
                      ⭐ MOST POPULAR
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-6 mt-2">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Professional</h3>
                    <p className="text-gray-600">For growing businesses</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">$49</span>
                      <span className="text-xl text-gray-600">/month</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Billed monthly</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">50,000 AI credits/month</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">All AI models (GPT-4, Claude, Gemini)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Unlimited projects</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Priority email support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Community access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Advanced AI models</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Priority support (24h response)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Custom integrations</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Full API access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-100">
                        <X className="h-3.5 w-3.5 text-red-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400 text-sm line-through">White-label solution</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-100">
                        <X className="h-3.5 w-3.5 text-red-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400 text-sm line-through">Dedicated account manager</span>
                    </div>
                  </div>
                </div>

                <Link href="/auth/signin" className="mt-auto">
                  <Button className="w-full h-12 text-base font-black bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all border-0">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
              </div>

              {/* Enterprise Plan */}
              <div className="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 p-8 shadow-lg hover:shadow-2xl hover:border-blue-300 transition-all hover:-translate-y-2 flex flex-col">
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Enterprise</h3>
                    <p className="text-gray-600">For large organizations</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">$199</span>
                      <span className="text-xl text-gray-600">/month</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Custom plans available</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium flex items-center gap-1.5">
                        <Infinity className="h-4 w-4" />
                        Unlimited AI credits
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">All AI models + Early access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Unlimited projects</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">24/7 phone & email support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Private community access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">All advanced AI models</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Priority support (1h response)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Custom integrations + webhooks</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Full API access + webhooks</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">White-label solution</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">Dedicated account manager</span>
                    </div>
                  </div>
                </div>

                <Link href="/auth/signin" className="mt-auto">
                  <Button className="w-full h-12 text-base font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0">
                    Contact Sales
                  </Button>
                </Link>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                All plans include free updates, security patches, and community support
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>14-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-5 py-2 text-sm font-bold text-yellow-700">
                <Star className="h-4 w-4 fill-yellow-700" />
                <span>Wall of Love</span>
              </div>
              <h2 className="mb-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Loved by developers
              </h2>
              <p className="text-xl text-gray-600">
                See what our customers are saying about us
              </p>
            </div>

            <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 p-8 shadow-lg hover:shadow-2xl hover:border-purple-500 transition-all hover:-translate-y-2"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-500"
                    />
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700">
                <MessageSquare className="h-4 w-4" />
                <span>FAQ</span>
              </div>
              <h2 className="mb-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our starter kit
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border-2 border-gray-200 bg-white overflow-hidden hover:border-purple-500 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-lg font-bold text-gray-900 pr-8">{faq.question}</span>
                    <ChevronDown
                      className={`h-6 w-6 text-gray-600 flex-shrink-0 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all ${
                      openFaq === i ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-12 md:p-16 shadow-2xl">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                <div className="relative text-center">
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Mail className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="mb-6 text-4xl md:text-5xl font-black text-white">
                    Get early access
                  </h2>
                  <p className="mb-8 text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                    Join our newsletter and be the first to know about new features, updates, and exclusive deals.
                  </p>

                  <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="flex-1 h-14 px-6 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors"
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="h-14 px-8 font-bold bg-white text-purple-600 hover:bg-purple-50 shadow-xl hover:scale-105 transition-all"
                      >
                        Subscribe
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </form>

                  <p className="mt-4 text-sm text-purple-200">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-20 md:py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 text-sm font-bold text-white">
                <Award className="h-4 w-4" />
                <span>Limited Time Offer</span>
              </div>

              <h2 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                Start building your SaaS today
              </h2>
              <p className="mb-10 text-xl md:text-2xl text-purple-100 leading-relaxed max-w-2xl mx-auto">
                Join 10,000+ developers who've shipped faster. Get started in minutes with our production-ready starter kit.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    className="group h-16 px-10 text-lg font-black bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 border-0"
                  >
                    <Rocket className="mr-2 h-6 w-6" />
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-16 px-10 text-lg font-bold border-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/50"
                  >
                    <Lightbulb className="mr-2 h-5 w-5" />
                    View Documentation
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-purple-200">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Cancel anytime</span>
                </div>
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
