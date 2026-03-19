"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  CirclePlay,
  CreditCard,
  LockKeyhole,
  Mail,
  Quote,
  Sparkles,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const features = [
  {
    title: "AI orchestration",
    description: "Model access, prompt handling, and response flows in one clean surface.",
    icon: Bot,
    tone: "bg-[#1f1b18] text-[#f3eadf] border-[#1f1b18]",
  },
  {
    title: "Authentication that feels finished",
    description: "NextAuth, verification, and permissions without the usual rough edges.",
    icon: LockKeyhole,
    tone: "bg-[#efe6dc] text-[#1f1b18] border-[#baad9f]",
  },
  {
    title: "Billing with structure",
    description: "Stripe subscriptions, credits, and payment handling already wired.",
    icon: CreditCard,
    tone: "bg-[#314337] text-[#f3eadf] border-[#314337]",
  },
];

const faqs = [
  {
    question: "What is included?",
    answer:
      "Authentication, billing, AI integration, admin tooling, docs routes, and the public marketing shell are already part of the project.",
  },
  {
    question: "Can I use it commercially?",
    answer:
      "Yes. The starter is designed to be customized and used as the base for real products and client work.",
  },
  {
    question: "Can I keep refining the look?",
    answer:
      "Yes. The new design system is intentionally restrained so it can be pushed further without fighting the structure.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#E5DBCF] text-[#1f1b18]">
      <Navbar />

      <main className="flex-1 pt-28">
        <section className="pb-20 pt-6 md:pt-10">
          <div className="container px-4 md:px-6">
            <div className="rounded-[2.25rem] border border-[#b8ab9c] bg-[#efe6dc] p-6 shadow-[0_30px_80px_-40px_rgba(31,27,24,0.45)] md:p-10 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#b8ab9c] bg-[#e5dbcf] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#61584f]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Premium AI SaaS starter
                  </div>
                  <div className="space-y-5">
                    <p className="text-sm uppercase tracking-[0.4em] text-[#73685e]">
                      Editorial interface. Production stack.
                    </p>
                    <h1 className="font-display max-w-4xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                      Premium design without gradients, noise, or visual clutter.
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-[#4f4942] md:text-xl">
                      The whole landing experience now leans on dark text, a warm `#E5DBCF` canvas, solid surfaces, and calmer hierarchy.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Link href="/auth/signin">
                      <Button className="h-14 rounded-full bg-[#1f1b18] px-8 text-base font-semibold text-[#f3eadf] hover:bg-[#312a25]">
                        Start building
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="#features">
                      <Button
                        variant="outline"
                        className="h-14 rounded-full border-[#6b6259] bg-transparent px-8 text-base font-semibold text-[#1f1b18] hover:bg-[#ddd2c6] hover:text-[#1f1b18]"
                      >
                        See the system
                        <CirclePlay className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      ["15 days", "from repo to launch"],
                      ["200+", "models on one rail"],
                      ["99.9%", "operational posture"],
                    ].map(([value, label]) => (
                      <div
                        key={label}
                        className="rounded-[1.4rem] border border-[#c8bbad] bg-[#e5dbcf] p-5"
                      >
                        <div className="text-3xl font-semibold">{value}</div>
                        <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#5f564d]">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-6 text-[#f3eadf] md:p-8">
                    <div className="flex items-center justify-between border-b border-[#3b342e] pb-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-[#b7a995]">
                          Operator view
                        </p>
                        <h2 className="font-display mt-3 text-3xl leading-none">
                          Launch console
                        </h2>
                      </div>
                      <div className="rounded-full border border-[#3b342e] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#d3c5b5]">
                        Ready
                      </div>
                    </div>
                    <div className="mt-6 space-y-3">
                      {[
                        "AI routing and actions",
                        "Access control and verification",
                        "Stripe subscriptions and credits",
                        "Admin surfaces and reporting",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-[1.25rem] border border-[#3b342e] bg-[#26211d] px-4 py-3"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#314337]">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-sm text-[#efe5da]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-[#b8ab9c] bg-[#f4eee6] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#314337] text-[#f3eadf]">
                        <Zap className="h-5 w-5" />
                      </div>
                      <p className="text-base leading-7 text-[#1f1b18]">
                        Premium here means restraint: fewer effects, stronger spacing, darker type, and surfaces that feel deliberate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-y border-[#c7b8aa] bg-[#ede3d8] py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                System design
              </p>
              <h2 className="font-display mt-4 text-4xl sm:text-5xl">
                Solid surfaces, sharp contrast, and a calmer product story.
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className={`rounded-[2rem] border p-7 shadow-[0_20px_44px_-36px_rgba(31,27,24,0.5)] ${feature.tone}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold leading-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 opacity-85">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-6">
                <div className="rounded-[2rem] border border-[#b9ab9d] bg-[#efe6dc] p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1b18] text-[#f3eadf]">
                      <Quote className="h-5 w-5" />
                    </div>
                    <p className="text-lg leading-8 text-[#332d29]">
                      Premium does not mean louder. It means fewer bad decisions and a cleaner sense of control.
                    </p>
                  </div>
                </div>
                <div className="rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-7 text-[#f3eadf]">
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#b7a995]">
                    Included
                  </p>
                  <div className="mt-5 space-y-3">
                    {[
                      "Authentication, roles, and admin access",
                      "Billing, credits, and webhook handling",
                      "AI model wiring and actions",
                      "Marketing, blog, and docs routes",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#314337]">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#b9ab9d] bg-[#efe6dc] p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                  FAQ
                </p>
                <h2 className="font-display mt-4 text-4xl">Common questions</h2>
                <div className="mt-8 space-y-4">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaq === index;

                    return (
                      <div
                        key={faq.question}
                        className="overflow-hidden rounded-[1.5rem] border border-[#c7b8aa] bg-[#f4ede5]"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                        >
                          <span className="text-lg font-semibold text-[#1f1b18]">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 flex-shrink-0 text-[#5f564d] transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <p className="px-6 pb-6 text-base leading-7 text-[#5a524a]">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container px-4 md:px-6">
            <div className="rounded-[2.2rem] border border-[#2b2521] bg-[#1f1b18] p-8 text-[#f3eadf] md:p-12">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#b7a995]">
                    Stay close to the updates
                  </p>
                  <h2 className="font-display mt-5 text-4xl leading-tight sm:text-5xl">
                    The new surface is quieter, warmer, and more premium by design.
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.8rem] border border-[#3b342e] bg-[#26211d] p-6">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b7a995]"
                  >
                    Email address
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9f9385]" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                        required
                        className="h-14 w-full rounded-full border border-[#4a4139] bg-[#1f1b18] pl-11 pr-5 text-base text-[#f3eadf] placeholder:text-[#8d8174] focus:border-[#d4c5b5] focus:outline-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="h-14 rounded-full bg-[#f3eadf] px-7 text-base font-semibold text-[#1f1b18] hover:bg-[#e1d6ca]"
                    >
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm leading-6 text-[#9f9385]">
                    No spam. Only product notes, releases, and useful updates.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
