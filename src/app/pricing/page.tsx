"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, CreditCard, Infinity, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const plans = [
  {
    name: "Individual",
    price: "$0",
    cadence: "/month",
    eyebrow: "Public Access",
    description: "A clean starting point for joining the irl.coop ecosystem as an individual.",
    accent: "bg-[#efe6dc] text-[#1f1b18] border-[#baad9f]",
    button: "bg-[#1f1b18] text-[#f3eadf] hover:bg-[#312a25]",
    note: "Free forever. For public shard participation.",
    features: [
      { label: "Matrix (Dendrite) access", included: true },
      { label: "Community OS core tools", included: true },
      { label: "Participate in surveys", included: true },
      { label: "Public event registration", included: true },
      { label: "Sovereign data shard", included: false },
      { label: "Voting rights", included: false },
    ],
  },
  {
    name: "Member",
    price: "$15",
    cadence: "/month",
    eyebrow: "Most selected",
    description: "For active cooperative members contributing to the collective treasury.",
    accent: "bg-[#1f1b18] text-[#f3eadf] border-[#1f1b18]",
    button: "bg-[#f3eadf] text-[#1f1b18] hover:bg-[#e1d6ca]",
    note: "Full cooperative rights and benefits.",
    features: [
      { label: "Federated Matrix rooms", included: true },
      { label: "Stalwart Mail hosting", included: true },
      { label: "Full CryptPad access", included: true },
      { label: "Voting and Governance", included: true },
      { label: "Community Treasury participation", included: true },
      { label: "Dedicated Sovereign Shard", included: false },
    ],
  },
  {
    name: "Sovereign Shard",
    price: "$149",
    cadence: "/month",
    eyebrow: "Community Chapters",
    description: "For organizations and community trust groups that want to host their own node.",
    accent: "bg-[#314337] text-[#f3eadf] border-[#314337]",
    button: "bg-[#f3eadf] text-[#1f1b18] hover:bg-[#e1d6ca]",
    note: "Complete data sovereignty and infra ownership.",
    features: [
      { label: "Full Federated Stack hosting", included: true, icon: Infinity },
      { label: "Unlimited member accounts", included: true },
      { label: "Citus Shard coordinator role", included: true },
      { label: "Local data persistence (MinIO)", included: true },
      { label: "Custom community governance", included: true },
      { label: "Global Federation connection", included: true },
    ],
  },
];

const faqs = [
  {
    question: "Is this a non-profit cooperative?",
    answer:
      "Yes. irl.coop is designed to support non-profit cooperatives, community land trusts, and DAO-like organizations.",
  },
  {
    question: "What is a Sovereign Shard?",
    answer:
      "A shard is a self-hosted or managed node that runs the full irl.coop stack, giving you complete ownership of your community's data.",
  },
  {
    question: "How do I participate in governance?",
    answer:
      "Governance is managed through the Community OS dashboard, where members can propose, discuss, and vote on collective decisions.",
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
                      Transparent membership for communities that own their future.
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-[#4f4942] md:text-xl">
                      Membership dues fund the collective infrastructure, ensuring data sovereignty and privacy for every participant in the federation.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-6 text-[#f3eadf] md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#b7a995]">
                    Included in every membership
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "Sovereign identity and decentralized auth",
                      "Privacy-first Federated communication",
                      "Distributed data storage and sharding",
                      "Collective governance tools and voting",
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
                      {plan.name === "Sovereign Shard" ? "Coordinate shard" : "Join the coop"}
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
                   Collective treasury management with no hidden costs.
                </h2>
                <div className="space-y-3 text-[#554d45]">
                  <div className="rounded-[1.5rem] border border-[#c8bbad] bg-[#f4ede5] px-5 py-4">
                    Individual membership is free for public participation.
                  </div>
                  <div className="rounded-[1.5rem] border border-[#c8bbad] bg-[#f4ede5] px-5 py-4">
                    All dues go directly into the community treasury.
                  </div>
                  <div className="rounded-[1.5rem] border border-[#c8bbad] bg-[#f4ede5] px-5 py-4">
                    Members own the infrastructure, not just the access.
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
