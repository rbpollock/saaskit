import Link from "next/link";
import { Zap, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container px-4 py-16 md:px-6 md:py-20">
        {/* Top Section */}
        <div className="grid gap-12 lg:grid-cols-5 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-2.5 rounded-xl">
                  <Zap className="h-6 w-6 text-white" fill="white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  AI SaaS Kit
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  Next.js 15 Starter
                </span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              The complete Next.js 15 starter kit for building AI-powered SaaS
              applications. Ship faster with built-in auth, payments, and AI
              integration.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500 transition-all overflow-hidden"
                aria-label="Twitter"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Twitter className="relative h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500 transition-all overflow-hidden"
                aria-label="GitHub"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Github className="relative h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500 transition-all overflow-hidden"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Linkedin className="relative h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-5 text-sm font-black text-white uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Pricing
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Documentation
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/api-docs"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    API Reference
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Blog
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Changelog
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-5 text-sm font-black text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Careers
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Partners
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-5 text-sm font-black text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Terms of Service
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Cookie Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    License
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-sm text-gray-400">
              © 2025 AI SaaS Starter Kit. All rights reserved.
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-400">
                All systems operational
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/docs"
              className="text-gray-400 hover:text-white transition-colors font-medium"
            >
              Documentation
            </Link>
            <Link
              href="/api-docs"
              className="text-gray-400 hover:text-white transition-colors font-medium"
            >
              API
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors font-medium"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
