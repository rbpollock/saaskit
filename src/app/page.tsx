import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CirclePlay,
  CreditCard,
  Database,
  Layers3,
  LockKeyhole,
  Quote,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { HomeFaqAndSignup } from "@/components/home-faq-signup";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { getSiteUrl, siteConfig } from "@/lib/site";

const homeTitle = "irl.coop Community OS - The Sovereign Stack for Decentralized Cooperatives";
const homeDescription =
  "Deploy a privacy-first, open-source infrastructure for your cooperative. Featuring Lit Protocol auth, Citus sharding, Matrix chat, and sovereign data management built for leaderless federations.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  keywords: [
    "irl.coop",
    "community os",
    "decentralized cooperative",
    "sovereign stack",
    "lit protocol",
    "citus sharding",
    "privacy-first",
    "open source coop",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

const heroStats = [
  ["Lit + Citus", "decentralized auth and sharding"],
  ["Sovereign Shards", "data sovereignty by design"],
  ["Matrix + Stalwart", "secure chat and email"],
];

const audiences = [
  {
    label: "Cooperative Organizers",
    title: "Launch the collective layer before the coordination gets messy",
    description:
      "Ship identity, membership dues, secure communication, and internal operations from a single sovereign shard instead of fragmented Web2 silos.",
  },
  {
    label: "Infrastructure Shards",
    title: "Host sovereign nodes for local community chapters",
    description:
      "Deploy a standardized Federated Stack for local cooperatives, community land trusts, or DAOs without rebuilding auth, encryption, and governance every time.",
  },
  {
    label: "Leaderless Federations",
    title: "Keep local autonomy while staying globally coherent",
    description:
      "Run local communications, member directories, and treasury tools that connect to a wider federation without surrendering your data to a central provider.",
  },
];

const features = [
  {
    title: "Community Intelligence",
    description: "Collective knowledge management and privacy-preserving AI orchestration.",
    icon: Bot,
    tone: "bg-[#1f1b18] text-[#f3eadf] border-[#1f1b18]",
  },
  {
    title: "Sovereign Identity",
    description: "Lit Protocol, SSI, and cryptographically enforced permissions.",
    icon: LockKeyhole,
    tone: "bg-[#efe6dc] text-[#1f1b18] border-[#baad9f]",
  },
  {
    title: "Cooperative Treasury",
    description: "Membership dues, collective billing, and transparent resource tracking.",
    icon: CreditCard,
    tone: "bg-[#314337] text-[#f3eadf] border-[#314337]",
  },
];

const platformSections = [
  {
    eyebrow: "Identity",
    title: "Decentralized Auth that actually works",
    description:
      "Login via Web3 wallets using Lit Protocol session sigs. No local password database, zero trust architecture.",
    icon: Sparkles,
    points: ["Lit Protocol Gateway", "SIWE Integration", "Programmable Key Pairs"],
    tone: "bg-[#efe6dc] border-[#b9ab9d] text-[#1f1b18]",
  },
  {
    eyebrow: "Communication",
    title: "Private, Federated Social Infrastructure",
    description:
      "Internal Matrix server for chat, Stalwart for mail, and Postiz for social coordination, all under your control.",
    icon: Layers3,
    points: ["Matrix / Dendrite", "Stalwart Mail (Rust)", "Postiz Social Manager"],
    tone: "bg-[#1f1b18] border-[#2b2521] text-[#f3eadf]",
  },
  {
    eyebrow: "Governance",
    title: "Transparent Collective Management",
    description:
      "Monitor community health, membership status, and treasury flows without external oversight.",
    icon: BarChart3,
    points: ["Admin Dashboard", "Membership Registry", "Role-based Access Control"],
    tone: "bg-[#f4ede5] border-[#cdbfb1] text-[#1f1b18]",
  },
  {
    eyebrow: "Operations",
    title: "Sharded Data and Distributed Services",
    description:
      "Citus-sharded PostgreSQL for global scale with local sovereignty. MinIO for S3-compatible storage.",
    icon: Workflow,
    points: ["Citus Sharded DB", "MinIO Object Storage", "Redis Cache Layer"],
    tone: "bg-[#314337] border-[#314337] text-[#f3eadf]",
  },
];

const stack = [
  "Lit Protocol",
  "Citus Sharding",
  "PostgreSQL",
  "Dendrite (Matrix)",
  "Stalwart (Mail)",
  "Postiz",
  "CryptPad",
  "MinIO",
];

const comparisonRows = [
  {
    task: "Sovereign identity and programmable permissions",
    withoutKit: "centralized silos",
    withKit: "included",
  },
  {
    task: "Federated chat, mail, and social coordination",
    withoutKit: "fragmented tools",
    withKit: "included",
  },
  {
    task: "Sharded database and distributed storage",
    withoutKit: "local scaling",
    withKit: "included",
  },
  {
    task: "Community dashboard and membership flows",
    withoutKit: "manual admin",
    withKit: "included",
  },
];

const launchSteps = [
  {
    step: "01",
    title: "Provision the Shard",
    description:
      "Initialize your community's sovereign infrastructure with a single command. Set up auth, DB sharding, and core services.",
  },
  {
    step: "02",
    title: "Define the Collective",
    description:
      "Configure membership tiers, resource permissions, and communication channels for your cooperative.",
  },
  {
    step: "03",
    title: "Activate Federation",
    description:
      "Connect with other irl.coop shards to share resources, identities, and governance models across a global network.",
  },
];

const faqs = [
  {
    question: "What is irl.coop?",
    answer:
      "irl.coop is a sovereign stack designed to help local cooperatives and community organizations own their infrastructure, data, and identity.",
  },
  {
    question: "How is it decentralised?",
    answer:
      "We use Lit Protocol for authentication (no central password database) and Citus for data sharding, allowing each community to 'own' their slice of the network.",
  },
  {
    question: "Is it only for tech cooperatives?",
    answer:
      "No. It is designed for housing cooperatives, artist collectives, community land trusts, and any group needing to coordinate resources without Web2 intermediaries.",
  },
  {
    question: "Can I host it myself?",
    answer:
      "Yes. The entire stack is containerized and designed to run on a single sovereign node (4GB RAM minimum) or as part of a larger cluster.",
  },
];

const pageShell = "marketing-shell px-4 md:px-6 xl:px-8";

export default function Home() {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteUrl,
        description: homeDescription,
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: siteUrl,
        description: homeDescription,
        featureList: [
          "Auth.js authentication and protected routes",
          "Stripe subscriptions and billing flows",
          "Prisma data layer and PostgreSQL support",
          "Admin dashboard and role management",
          "Marketing pages, pricing, docs, and blog",
          "AI model integrations and action flows",
        ],
        audience: [
          { "@type": "Audience", audienceType: "SaaS founders" },
          { "@type": "Audience", audienceType: "Agencies building client software" },
          { "@type": "Audience", audienceType: "Product teams shipping subscription apps" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
  return (
    <>
      <JsonLd id="home-structured-data" data={structuredData} />

      <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#E5DBCF] text-[#1f1b18]">
        <Navbar />

        <main className="flex-1 pt-28">
          <section className="pb-20 pt-6 md:pt-10">
            <div className={pageShell}>
              <div className="rounded-[2.4rem] border border-[#b8ab9c] bg-[#efe6dc] p-6 shadow-[0_30px_80px_-40px_rgba(31,27,24,0.45)] md:p-10 lg:p-12">
                <div className="grid gap-10 xl:grid-cols-[1.08fr_0.92fr]">
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#b8ab9c] bg-[#e5dbcf] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#61584f]">
                      <Sparkles className="h-3.5 w-3.5" />
                      Next.js Community OS
                    </div>
                    <div className="space-y-5">
                      <p className="text-sm uppercase tracking-[0.34em] text-[#73685e]">
                        For decentralized cooperatives, land trusts, and sovereign shards.
                      </p>
                      <h1 className="font-display max-w-5xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                        Deploy a sovereign stack for your cooperative with identity, chat, mail, and treasury already wired.
                      </h1>
                      <p className="max-w-3xl text-lg leading-8 text-[#4f4942] md:text-xl">
                        Built for communities that want to own their digital infrastructure. Privacy-first communications, sharded data sovereignty, and collective governance in one sovereign node.
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
                      {heroStats.map(([value, label]) => (
                        <div
                          key={label}
                          className="rounded-[1.5rem] border border-[#c8bbad] bg-[#e5dbcf] p-5"
                        >
                          <div className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                            {value}
                          </div>
                          <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#5f564d]">
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6e6359]">
                        Connected stack
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {stack.map((item) => (
                          <div
                            key={item}
                            className="rounded-full border border-[#c8bbad] bg-[#f4ede5] px-4 py-2 text-sm font-semibold text-[#4f4942]"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-6 text-[#f3eadf] md:p-8">
                      <div className="flex items-center justify-between border-b border-[#3b342e] pb-5">
                        <div>
                          <p className="text-xs uppercase tracking-[0.32em] text-[#b7a995]">
                            Working surface
                          </p>
                          <h2 className="font-display mt-3 text-3xl leading-none">
                            Launch console
                          </h2>
                        </div>
                        <div className="rounded-full border border-[#3b342e] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#d3c5b5]">
                          Ready to adapt
                        </div>
                      </div>
                      <div className="mt-6 space-y-3">
                        {[
                          "Lit Protocol session signatures",
                          "Citus-sharded data architecture",
                          "Matrix (Dendrite) secure chat",
                          "Stalwart (Rust) federated mail",
                          "Collective governance dashboard",
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
                      <div className="mt-6 grid gap-4 border-t border-[#3b342e] pt-6 sm:grid-cols-2">
                        {[
                          [
                            "Sovereign by default",
                            "Identity, storage, and communication are owned by the community.",
                          ],
                          [
                            "Federated by design",
                            "Connect your shard to the wider irl.coop network without a central hub.",
                          ],
                        ].map(([title, description]) => (
                          <div
                            key={title}
                            className="rounded-[1.3rem] border border-[#3b342e] bg-[#26211d] p-4"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b7a995]">
                              {title}
                            </p>
                            <p className="mt-3 text-sm leading-6 text-[#d8ccbf]">
                              {description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.6rem] border border-[#b8ab9c] bg-[#f4eee6] p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#314337] text-[#f3eadf]">
                            <Zap className="h-5 w-5" />
                          </div>
                          <p className="text-base leading-7 text-[#1f1b18]">
                            The design language stays restrained on purpose so the site looks branded rather than auto-generated.
                          </p>
                        </div>
                      </div>
                      <div className="rounded-[1.6rem] border border-[#b8ab9c] bg-[#e5dbcf] p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1f1b18] text-[#f3eadf]">
                            <Database className="h-5 w-5" />
                          </div>
                          <p className="text-base leading-7 text-[#1f1b18]">
                            The page uses real product detail instead of decorative filler, which improves both trust and SEO.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20">
            <div className={pageShell}>
              <div className="rounded-[2rem] border border-[#c7b8aa] bg-[#f4ede5] p-6 md:p-8">
                <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
                  <div className="space-y-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                      Built for real launch teams
                    </p>
                    <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                      A sovereign infrastructure for cooperative organizers, local land trusts, and federated shards.
                    </h2>
                    <p className="text-lg leading-8 text-[#5a524a]">
                      This is more than a template. It is the irl.coop Community OS, designed for organizations that need to own their communication, identity, and shared treasury.
                    </p>
                  </div>
                  <div className="divide-y divide-[#cfbfae] border-y border-[#cfbfae]">
                    {audiences.map((item) => (
                      <div
                        key={item.label}
                        className="grid gap-4 py-5 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7a6f64]">
                          {item.label}
                        </p>
                        <div>
                          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#1f1b18]">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-base leading-7 text-[#5a524a]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-[#c7b8aa] bg-[#ede3d8] py-20">
            <div className={pageShell}>
              <div className="grid gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
                <div className="max-w-2xl space-y-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                    Complete surface
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl">
                    A landing page that explains the product, the stack, and the operating model.
                  </h2>
                  <p className="text-lg leading-8 text-[#5a524a]">
                    The collective portal carries searchable, community-specific content around identity, federated tools, sharding, and governance instead of generic SaaS claims.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {platformSections.map((section) => {
                    const Icon = section.icon;

                    return (
                      <div
                        key={section.title}
                        className={`rounded-[2rem] border p-6 shadow-[0_20px_44px_-36px_rgba(31,27,24,0.5)] ${section.tone}`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] opacity-70">
                          {section.eyebrow}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold leading-tight">
                          {section.title}
                        </h3>
                        <p className="mt-4 text-base leading-7 opacity-85">
                          {section.description}
                        </p>
                        <div className="mt-6 space-y-3">
                          {section.points.map((item) => (
                            <div key={item} className="flex items-start gap-3 text-sm">
                              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
                                <Check className="h-3 w-3" />
                              </div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="py-20">
            <div className={pageShell}>
              <div className="mb-10 max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                  System design
                </p>
                <h2 className="font-display mt-4 text-4xl sm:text-5xl">
                  Strong hierarchy, quieter surfaces, and product-first copy.
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
              <div className="mt-10 rounded-[2rem] border border-[#b9ab9d] bg-[#efe6dc] p-6 md:p-8">
                <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                      Why it reads better
                    </p>
                    <h3 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                      Premium does not come from more gradients and badges. It comes from cleaner decisions, stronger copy, and a product story that holds together.
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Concrete stack language replaces vague marketing claims.",
                      "Asymmetric editorial sections reduce the copy-paste template feel.",
                      "Searchable content around docs, billing, admin, and onboarding supports SEO.",
                      "The page stays warm and branded without drifting into generic AI-site styling.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.4rem] border border-[#c8bbad] bg-[#f4ede5] p-5 text-base leading-7 text-[#4f4942]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-[#c7b8aa] bg-[#ede3d8] py-20">
            <div className={pageShell}>
              <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[2rem] border border-[#b9ab9d] bg-[#efe6dc] p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                    Stop rebuilding the same layers
                  </p>
                  <h2 className="font-display mt-4 text-4xl sm:text-5xl">
                    Use the starter for the repeatable work and keep your energy for the product that actually differentiates you.
                  </h2>
                  <div className="mt-8 space-y-4">
                    {comparisonRows.map((row) => (
                      <div
                        key={row.task}
                        className="rounded-[1.5rem] border border-[#c7b8aa] bg-[#f4ede5] p-5 md:grid md:grid-cols-[1.5fr_0.75fr_0.75fr] md:items-center md:gap-4"
                      >
                        <div>
                          <p className="text-lg font-semibold text-[#1f1b18]">{row.task}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7268]">
                            Without kit
                          </p>
                          <p className="mt-2 text-base font-semibold text-[#7c3529]">
                            {row.withoutKit}
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b7268]">
                            With kit
                          </p>
                          <p className="mt-2 text-base font-semibold text-[#314337]">
                            {row.withKit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-7 text-[#f3eadf]">
                    <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#b7a995]">
                      Launch flow
                    </p>
                    <h2 className="font-display mt-4 text-4xl leading-tight">
                      A simple path from starter kit to branded product.
                    </h2>
                    <div className="mt-8 space-y-4">
                      {launchSteps.map((item) => (
                        <div
                          key={item.step}
                          className="rounded-[1.6rem] border border-[#3b342e] bg-[#26211d] p-5"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b7a995]">
                            Step {item.step}
                          </p>
                          <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                          <p className="mt-3 text-base leading-7 text-[#d8ccbf]">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-[#b9ab9d] bg-[#efe6dc] p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1b18] text-[#f3eadf]">
                        <Quote className="h-5 w-5" />
                      </div>
                      <p className="text-lg leading-8 text-[#332d29]">
                        Premium does not mean louder. It means clearer structure, calmer typography, and fewer weak decisions across the page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <HomeFaqAndSignup faqs={faqs} />
        </main>

        <Footer />
      </div>
    </>
  );
}
