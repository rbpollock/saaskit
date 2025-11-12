"use client";

import { Button } from "@/components/ui/button";
import {
  Check,
  ArrowRight,
  CreditCard,
  Star,
  X,
  Infinity,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="light min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl animate-pulse" />
          <div
            className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-medium text-white">
              <CreditCard className="h-4 w-4" />
              <span>Pricing Plans</span>
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-purple-100 md:text-2xl">
              Choose the plan that's right for you. Upgrade or downgrade
              anytime.
            </p>
            <p className="mt-4 text-sm text-purple-200">
              💰 Save 10% with yearly billing
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 80L60 70C120 60 240 40 360 33.3C480 26.7 600 33.3 720 40C840 46.7 960 53.3 1080 50C1200 46.7 1320 33.3 1380 26.7L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Pricing Cards - Modern Design from Landing Page */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Starter Plan */}
              <div className="group relative h-full">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-2xl hover:-translate-y-1 flex flex-col">
                  {/* Plan Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1 mb-4">
                      <span className="text-xs font-bold text-gray-700">
                        FREE PLAN
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-2">
                      Starter
                    </h3>
                    <p className="text-gray-600">Perfect for getting started</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-6xl font-black text-gray-900">
                        $0
                      </span>
                      <span className="text-xl text-gray-600">/month</span>
                    </div>
                    <p className="text-sm font-semibold text-emerald-600">
                      Free forever • No credit card
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-700 font-medium">
                        1,000 AI credits/month
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-700 font-medium">
                        Basic AI models (GPT-3.5)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-700 font-medium">
                        5 projects maximum
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-700 font-medium">
                        Email support
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-700 font-medium">
                        Community access
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                        <X className="h-3 w-3 text-gray-500" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400">Advanced AI models</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                        <X className="h-3 w-3 text-gray-500" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400">Priority support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                        <X className="h-3 w-3 text-gray-500" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400">
                        Custom integrations
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                        <X className="h-3 w-3 text-gray-500" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400">API access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                        <X className="h-3 w-3 text-gray-500" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400">
                        White-label solution
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                        <X className="h-3 w-3 text-gray-500" strokeWidth={3} />
                      </div>
                      <span className="text-gray-400">
                        Dedicated account manager
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="/auth/signin" className="mt-4">
                    <Button className="w-full h-14 text-base font-bold bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Professional Plan - Most Popular */}
              <div className="group relative h-full md:-mt-4">
                {/* Popular Badge - More visible */}
                <div className="relative mb-4">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-6 py-2.5 shadow-2xl">
                      <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                      <span className="text-sm font-black text-white tracking-wide">
                        MOST POPULAR
                      </span>
                      <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                    </div>
                  </div>
                </div>

                <div className="relative h-full rounded-3xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 p-[3px] shadow-2xl hover:shadow-purple-500/50 transition-all hover:-translate-y-1 mt-8">
                  <div className="h-full rounded-[calc(1.5rem-3px)] bg-white p-8 flex flex-col">
                    {/* Plan Header */}
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 mb-4">
                        <span className="text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          BEST VALUE
                        </span>
                      </div>
                      <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Professional
                      </h3>
                      <p className="text-gray-700 font-medium">
                        For growing businesses
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          $49
                        </span>
                        <span className="text-xl text-gray-600">/month</span>
                      </div>
                      <p className="text-sm font-semibold text-purple-600">
                        Billed monthly • Cancel anytime
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8 flex-1">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          50,000 AI credits/month
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          All AI models (GPT-4, Claude, Gemini)
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          Unlimited projects
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          Priority email support (24h)
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          Community access
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          Advanced AI models
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          Priority support
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          Custom integrations
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Check
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          Full API access
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                          <X
                            className="h-3 w-3 text-gray-400"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-gray-400">
                          White-label solution
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                          <X
                            className="h-3 w-3 text-gray-400"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-gray-400">
                          Dedicated account manager
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href="/auth/signin" className="mt-4">
                      <Button className="w-full h-14 text-base font-black bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-0">
                        Get Started Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="group relative h-full">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 p-8 shadow-xl border-2 border-blue-200 hover:border-blue-300 transition-all hover:shadow-2xl hover:-translate-y-1 flex flex-col">
                  {/* Plan Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-200 px-3 py-1 mb-4">
                      <span className="text-xs font-bold text-blue-700">
                        ENTERPRISE
                      </span>
                    </div>
                    <h3 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                      Enterprise
                    </h3>
                    <p className="text-gray-700 font-medium">
                      For large organizations
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-6xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        $199
                      </span>
                      <span className="text-xl text-gray-600">/month</span>
                    </div>
                    <p className="text-sm font-semibold text-blue-600">
                      Custom plans available
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-900 font-semibold flex items-center gap-1.5">
                        <Infinity className="h-4 w-4 text-blue-600" />
                        Unlimited AI credits
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-900 font-semibold">
                        All AI models + Early access
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-900 font-semibold">
                        Unlimited projects
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-900 font-semibold">
                        24/7 phone & email support
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-900 font-semibold">
                        Private community access
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-900 font-semibold">
                        All advanced AI models
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-900 font-semibold">
                        Priority support (1h response)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-900 font-semibold">
                        Custom integrations + webhooks
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-900 font-semibold">
                        Full API access + webhooks
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-900 font-semibold">
                        White-label solution
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Check
                          className="h-3 w-3 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-900 font-semibold">
                        Dedicated account manager
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="/auth/signin" className="mt-4">
                    <Button className="w-full h-14 text-base font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all border-0">
                      Contact Sales Team
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 text-center">
            <p className="text-gray-700 font-semibold mb-6 text-lg">
              All plans include 14-day money-back guarantee
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-700 font-semibold">
                  No credit card required
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-700 font-semibold">
                  Cancel anytime
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-50 border border-purple-200">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-700 font-semibold">
                  Free updates forever
                </span>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Can I change plans later?
                </h3>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time.
                  Changes take effect immediately.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit cards and debit cards through
                  Stripe's secure payment processing.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600">
                  Yes! Our Free plan lets you try out the platform with no
                  credit card required.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-2 border-gray-200 hover:border-purple-500 hover:text-purple-600"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
