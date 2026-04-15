"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, Zap } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
    { name: "Blog", href: "/blog" },
    { name: "API", href: "/api-docs" },
  ];

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50">
      <div className={`transition-all duration-500 ${isScrolled ? "py-4" : "py-0"}`}>
        <nav
          className={`pointer-events-auto mx-auto transition-all duration-500 ${
            isScrolled
              ? "max-w-[90rem] rounded-full border border-[#b8ab9c] bg-[#efe6dc]/95 backdrop-blur-xl shadow-[0_20px_45px_-30px_rgba(31,27,24,0.45)]"
              : "border-b border-[#ccbfae] bg-[#E5DBCF]/88 backdrop-blur-xl"
          }`}
        >
          <div className={`${isScrolled ? "px-6" : "container mx-auto px-4 md:px-6"}`}>
            <div className={`flex items-center justify-between ${isScrolled ? "h-16" : "h-20"}`}>
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f1b18] text-[#f3eadf] transition-transform group-hover:scale-105">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-xl text-[#1f1b18] md:text-2xl">
                    irl.coop
                  </span>
                  {!isScrolled && (
                    <span className="-mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#73685e]">
                      Community OS
                    </span>
                  )}
                </div>
              </Link>

              <div className="hidden items-center gap-1 lg:flex">
                {navItems.map((item) => {
                  const isActive = item.href.startsWith("/#")
                    ? pathname === "/"
                    : pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "bg-[#1f1b18] text-[#f3eadf]"
                          : "text-[#2f2924] hover:bg-[#ddd2c6]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="hidden items-center gap-3 lg:flex">
                <Link href="/auth/signin">
                  <Button
                    variant="ghost"
                    className="font-semibold text-[#1f1b18] hover:bg-[#ddd2c6] hover:text-[#1f1b18]"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button className="rounded-full bg-[#1f1b18] font-semibold text-[#f3eadf] hover:bg-[#312a25]">
                    Join the Coop
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <button
                className="rounded-xl p-2.5 transition-colors hover:bg-[#ddd2c6] lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-[#1f1b18]" />
                ) : (
                  <Menu className="h-6 w-6 text-[#1f1b18]" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="pointer-events-auto mx-4 rounded-[1.5rem] border border-[#c6b9aa] bg-[#efe6dc]/95 p-4 shadow-[0_20px_40px_-30px_rgba(31,27,24,0.45)] lg:hidden">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = item.href.startsWith("/#")
                ? pathname === "/"
                : pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
                    isActive
                      ? "bg-[#1f1b18] text-[#f3eadf]"
                      : "text-[#2f2924] hover:bg-[#ddd2c6]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 space-y-3 border-t border-[#c7b9ab] pt-4">
            <Link href="/auth/signin" className="block">
              <Button
                variant="outline"
                className="h-12 w-full rounded-xl border-[#6b6259] bg-transparent text-base font-semibold text-[#1f1b18] hover:bg-[#ddd2c6] hover:text-[#1f1b18]"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signin" className="block">
              <Button className="h-12 w-full rounded-xl bg-[#1f1b18] text-base font-semibold text-[#f3eadf] hover:bg-[#312a25]">
                Join the Coop
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
