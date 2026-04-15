import Link from "next/link";
import { Github, Linkedin, Twitter, Zap } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#3a322d] bg-[#1f1b18] text-[#f2e9df]">
      <div className="container px-4 py-16 md:px-6 md:py-20">
        <div className="mb-12 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="group mb-6 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f2e9df] text-[#1f1b18] transition-transform group-hover:scale-105">
                <Zap className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl text-[#f2e9df]">
                  irl.coop
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b6a896]">
                  Community OS
                </span>
              </div>
            </Link>
            <p className="mb-6 max-w-sm leading-relaxed text-[#c5b8a8]">
              A sovereign stack for decentralized cooperatives, local land
              trusts, and federated shards. Privacy-first by design.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4d433b] text-[#d9ccbc] transition-all hover:border-[#d9ccbc] hover:bg-[#2b2521]"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4d433b] text-[#d9ccbc] transition-all hover:border-[#d9ccbc] hover:bg-[#2b2521]"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4d433b] text-[#d9ccbc] transition-all hover:border-[#d9ccbc] hover:bg-[#2b2521]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#f2e9df]">
              Product
            </h3>
            <div className="space-y-3 text-[#c5b8a8]">
              <Link href="/pricing" className="block transition-colors hover:text-[#f2e9df]">
                Pricing
              </Link>
              <Link href="/docs" className="block transition-colors hover:text-[#f2e9df]">
                Documentation
              </Link>
              <Link href="/api-docs" className="block transition-colors hover:text-[#f2e9df]">
                API Reference
              </Link>
              <Link href="/blog" className="block transition-colors hover:text-[#f2e9df]">
                Blog
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#f2e9df]">
              Company
            </h3>
            <div className="space-y-3 text-[#c5b8a8]">
              <Link href="#" className="block transition-colors hover:text-[#f2e9df]">
                About Us
              </Link>
              <Link href="#" className="block transition-colors hover:text-[#f2e9df]">
                Contact
              </Link>
              <Link href="#" className="block transition-colors hover:text-[#f2e9df]">
                Careers
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#f2e9df]">
              Legal
            </h3>
            <div className="space-y-3 text-[#c5b8a8]">
              <Link href="#" className="block transition-colors hover:text-[#f2e9df]">
                Privacy Policy
              </Link>
              <Link href="#" className="block transition-colors hover:text-[#f2e9df]">
                Terms of Service
              </Link>
              <Link href="#" className="block transition-colors hover:text-[#f2e9df]">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-8 h-px bg-[#3b322c]" />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <p className="text-sm text-[#b7a995]">
              Copyright {year} irl.coop. All rights reserved.
            </p>
            <div className="flex items-center gap-2 rounded-full border border-[#4d433b] bg-[#26211d] px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-[#d7c7b7]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b7a995]">
                All systems operational
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/docs"
              className="font-medium text-[#c5b8a8] transition-colors hover:text-[#f2e9df]"
            >
              Documentation
            </Link>
            <Link
              href="/api-docs"
              className="font-medium text-[#c5b8a8] transition-colors hover:text-[#f2e9df]"
            >
              API
            </Link>
            <Link
              href="#"
              className="font-medium text-[#c5b8a8] transition-colors hover:text-[#f2e9df]"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
