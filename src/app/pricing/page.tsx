"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, CreditCard, Infinity, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const plans = [
  {
    name: "Starter",
    price: "$0",
    cadence: "/month",
    eyebrow: "Free plan",
    description: "A clean starting point for testing the product and core AI flows.",
    accent: "bg-[#efe6dc] text-[#1f1b18] border-[#baad9f]",
    button: "bg-[#1f1b18] text-[#f3eadf] hover:bg-[#312a25]",
    note: "Free forever. No credit card required.",
    features: [
      { label: "1,000 AI credits each month", included: true },
      { label: "Core AI models", included: true },
      { label: "Up to 5 projects", included: true },
      { label: "Email support", included: true },
      { label: "Advanced models", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Professional",
    price: "$49",
    cadence: "/month",
    eyebrow: "Most selected",
    description: "For teams that need full access, cleaner velocity, and room to scale.",
    accent: "bg-[#1f1b18] text-[#f3eadf] border-[#1f1b18]",
    button: "bg-[#f3eadf] text-[#1f1b18] hover:bg-[#e1d6ca]",
    note: "All core features included. Cancel any time.",
    features: [
      { label: "50,000 AI credits each month", included: true },
      { label: "All standard and advanced models", included: true },
      { label: "Unlimited projects", included: true },
      { label: "Priority support", included: true },
      { label: "API access", included: true },
      { label: "White-label delivery", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "$199",
    cadence: "/month",
    eyebrow: "Scaled teams",
    description: "For organizations that want higher limits, tighter support, and custom delivery.",
    accent: "bg-[#314337] text-[#f3eadf] border-[#314337]",
    button: "bg-[#f3eadf] text-[#1f1b18] hover:bg-[#e1d6ca]",
    note: "Custom arrangements available for larger usage.",
    features: [
      { label: "Unlimited AI credits", included: true, icon: Infinity },
      { label: "All models plus priority access", included: true },
      { label: "Unlimited projects and teams", included: true },
      { label: "Priority support and guidance", included: true },
      { label: "Custom integrations and webhooks", included: true },
      { label: "Dedicated account coverage", included: true },
    ],
  },
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes. The plan structure is designed for upgrades and downgrades as your usage changes.",
  },
  {
    question: "Is there a free way to try the product?",
    answer:
      "Yes. The Starter plan is intended to let you evaluate the product without a card on file.",
  },
  {
    question: "Do enterprise teams get custom terms?",
    answer:
      "Yes. Enterprise plans can be shaped around usage, support expectations, and integration needs.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#E5DBCF] text-[#1f1b18]">
      <Navbar />

      <main className="pt-28">
        <section className="pb-12 pt-6 md:pt-10">
          <div className="container px-4 md:px-6">
            <div className="rounded-[2.2rem] border border-[#b8ab9c] bg-[#efe6dc] p-6 shadow-[0_30px_80px_-40px_rgba(31,27,24,0.45)] md:p-10 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#b8ab9c] bg-[#e5dbcf] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#61584f]">
                    <CreditCard className="h-3.5 w-3.5" />
                    Pricing
                  </div>
                  <div className="space-y-5">
                    <p className="text-sm uppercase tracking-[0.34em] text-[#73685e]">
                      Calm pricing, clear value
                    </p>
                    <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                      Straightforward plans for products that need to look serious.
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-[#4f4942] md:text-xl">
                      The pricing page now follows the same premium neutral system: warm canvas, dark type, solid cards, and clearer hierarchy.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-6 text-[#f3eadf] md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#b7a995]">
                    Included in every paid plan
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "Authentication, permissions, and admin controls",
                      "Billing and subscription workflows",
                      "AI model access and action wiring",
                      "Marketing, docs, and content surfaces",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-[1.25rem] border border-[#3b342e] bg-[#26211d] px-4 py-3"
                      >
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#314337]">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm text-[#efe5da]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-[2rem] border p-7 shadow-[0_20px_44px_-36px_rgba(31,27,24,0.5)] ${plan.accent}`}
                >
                  <div className="mb-6">
                    <div className="inline-flex rounded-full border border-current/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] opacity-80">
                      {plan.eyebrow}
                    </div>
                    <h2 className="mt-5 text-3xl font-semibold">{plan.name}</h2>
                    <p className="mt-3 text-sm leading-7 opacity-85">{plan.description}</p>
                  </div>

                  <div className="mb-8 flex items-end gap-2">
                    <span className="text-6xl font-semibold">{plan.price}</span>
                    <span className="pb-2 text-base opacity-70">{plan.cadence}</span>
                  </div>

                  <p className="mb-8 text-sm opacity-75">{plan.note}</p>

                  <div className="space-y-3">
                    {plan.features.map((feature) => {
                      const Icon = feature.icon;

                      return (
                        <div key={feature.label} className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                              feature.included ? "bg-[#314337] text-[#f3eadf]" : "bg-black/10 text-current/50"
                            }`}
                          >
                            {feature.included ? (
                              Icon ? <Icon className="h-3 w-3" /> : <Check className="h-3 w-3" />
                            ) : (
                              <X className="h-3 w-3" />
                            )}
                          </div>
                          <span className={feature.included ? "opacity-100" : "opacity-55"}>
                            {feature.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <Link href="/auth/signin" className="mt-8 block">
                    <Button className={`h-14 w-full rounded-full text-base font-semibold ${plan.button}`}>
                      {plan.name === "Enterprise" ? "Contact sales" : "Choose plan"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#c7b8aa] bg-[#ede3d8] py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                  Trust layer
                </p>
                <h2 className="font-display text-4xl sm:text-5xl">
                  The terms stay simple even when the product gets more capable.
                </h2>
                <div className="space-y-3 text-[#554d45]">
                  <div className="rounded-[1.5rem] border border-[#c8bbad] bg-[#f4ede5] px-5 py-4">
                    No credit card required for the starter plan.
                  </div>
                  <div className="rounded-[1.5rem] border border-[#c8bbad] bg-[#f4ede5] px-5 py-4">
                    Upgrade or downgrade as your usage changes.
                  </div>
                  <div className="rounded-[1.5rem] border border-[#c8bbad] bg-[#f4ede5] px-5 py-4">
                    Paid plans include the product infrastructure, not just the UI surface.
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

        <section className="py-16 pb-24 md:py-20 md:pb-24">
          <div className="container px-4 text-center md:px-6">
            <Link href="/">
              <Button
                variant="outline"
                className="h-14 rounded-full border-[#6b6259] bg-transparent px-8 text-base font-semibold text-[#1f1b18] hover:bg-[#ddd2c6] hover:text-[#1f1b18]"
              >
                Back to home
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
