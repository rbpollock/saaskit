"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "danger" | "note";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ type = "info", title, children, className }: CalloutProps) {
  const styles = {
    info: {
      container: "border-[#c7b8aa] bg-[#f3ebe2]",
      icon: "text-[#1f1b18]",
      title: "text-[#1f1b18]",
      Icon: Info,
    },
    warning: {
      container: "border-[#c89f62] bg-[#f2e5d2]",
      icon: "text-[#8a5d1f]",
      title: "text-[#5d3a0e]",
      Icon: AlertTriangle,
    },
    success: {
      container: "border-[#92a483] bg-[#e8eee2]",
      icon: "text-[#41533a]",
      title: "text-[#2f3f29]",
      Icon: CheckCircle2,
    },
    danger: {
      container: "border-[#c38a79] bg-[#f3e4de]",
      icon: "text-[#8a4f43]",
      title: "text-[#6d352a]",
      Icon: AlertCircle,
    },
    note: {
      container: "border-[#d5c7ba] bg-[#f7f0e7]",
      icon: "text-[#5c554d]",
      title: "text-[#1f1b18]",
      Icon: Info,
    },
  };

  const style = styles[type];

  return (
    <div
      className={cn(
        "my-6 rounded-[1.35rem] border px-5 py-4 shadow-[0_18px_40px_-34px_rgba(31,27,24,0.35)]",
        style.container,
        className
      )}
    >
      <div className="flex gap-3">
        <style.Icon className={cn("mt-0.5 h-5 w-5 flex-shrink-0", style.icon)} />
        <div className="flex-1">
          {title && (
            <h5 className={cn("mb-1 text-sm font-semibold uppercase tracking-[0.16em]", style.title)}>
              {title}
            </h5>
          )}
          <div className="text-sm leading-7 text-[#5b534b] [&>p]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  title,
  showLineNumbers = false,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-[1.5rem] border border-[#2b2521] bg-[#1f1b18] shadow-[0_26px_60px_-44px_rgba(31,27,24,0.65)]",
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-[#3b342e] bg-[#241f1b] px-5 py-3">
          <span className="text-sm font-medium text-[#f3eadf]">{title}</span>
          <span className="rounded-full border border-[#4d463f] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#bdb1a4]">
            {language}
          </span>
        </div>
      )}
      <div className="group relative">
        <button
          onClick={copyToClipboard}
          className="absolute right-4 top-4 rounded-xl border border-[#4d463f] bg-[#2b2521] p-2 text-[#c9beb2] transition-all hover:bg-[#342d28] hover:text-[#f3eadf] md:opacity-0 md:group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-[#d8ead2]" /> : <Copy className="h-4 w-4" />}
        </button>
        <pre className="overflow-x-auto p-5 text-sm leading-7">
          <code className="font-mono text-[#f3eadf]">
            {showLineNumbers ? (
              <div className="flex">
                <div className="select-none pr-4 text-right text-[#756d66]">
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1">
                  {lines.map((line, i) => (
                    <div
                      key={i}
                      className={cn(
                        highlightLines.includes(i + 1) &&
                          "-mx-5 border-l-2 border-[#d8c7b6] bg-[#2d2722] px-5"
                      )}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border border-[#d8cabc] bg-[#efe6dc] px-1.5 py-0.5 font-mono text-sm text-[#78421f]">
      {children}
    </code>
  );
}

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
  children: React.ReactNode;
  className?: string;
}

export function DocBadge({ variant = "default", children, className }: BadgeProps) {
  const styles = {
    default: "border-[#d5c7ba] bg-[#f4ede5] text-[#4f473f]",
    success: "border-[#aab99b] bg-[#e7eee0] text-[#395034]",
    warning: "border-[#d0b183] bg-[#f2e7d8] text-[#7a5418]",
    danger: "border-[#cca091] bg-[#f4e4de] text-[#8a4f43]",
    info: "border-[#c8bbb0] bg-[#efe6dc] text-[#1f1b18]",
    purple: "border-[#c5b7c8] bg-[#eee5ef] text-[#615067]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  gradient?: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, href, gradient, className }: FeatureCardProps) {
  const content = (
    <>
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "rounded-2xl p-3 shadow-[0_18px_30px_-24px_rgba(31,27,24,0.45)]",
            gradient || "bg-[#1f1b18] text-[#f3eadf]"
          )}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-[#1f1b18]">{title}</h3>
          <p className="text-sm leading-7 text-[#5b534b]">{description}</p>
        </div>
      </div>
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 w-0 rounded-full transition-all duration-300 group-hover:w-full",
          gradient || "bg-[#1f1b18]"
        )}
      />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "group relative block overflow-hidden rounded-[1.55rem] border border-[#c7b8aa] bg-[#f6efe7] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#8d7e72] hover:shadow-[0_24px_50px_-40px_rgba(31,27,24,0.35)]",
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.55rem] border border-[#c7b8aa] bg-[#f6efe7] p-6 shadow-[0_18px_36px_-34px_rgba(31,27,24,0.3)]",
        className
      )}
    >
      {content}
    </div>
  );
}

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return <div className={cn("my-8 space-y-6", className)}>{children}</div>;
}

interface StepProps {
  step: number;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Step({ step, title, children, className }: StepProps) {
  return (
    <div
      className={cn(
        "relative border-l border-[#d3c6ba] pb-8 pl-10 last:border-0 last:pb-0",
        className
      )}
    >
      <div className="absolute -left-[18px] top-0 flex h-9 w-9 items-center justify-center rounded-full border border-[#2b2521] bg-[#1f1b18] text-sm font-bold text-[#f3eadf] shadow-[0_14px_30px_-22px_rgba(31,27,24,0.6)]">
        {step}
      </div>
      <div className="space-y-2 pt-0.5">
        <h3 className="text-lg font-semibold text-[#1f1b18]">{title}</h3>
        <div className="text-sm leading-7 text-[#5b534b]">{children}</div>
      </div>
    </div>
  );
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  return (
    <div
      className={cn(
        "sticky top-24 space-y-2 rounded-[1.4rem] border border-[#c7b8aa] bg-[#f4ede5] p-5",
        className
      )}
    >
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a6f65]">
        On this page
      </h4>
      <nav className="space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block py-1 text-sm text-[#5b534b] transition-colors hover:text-[#1f1b18]",
              item.level === 2 && "pl-0",
              item.level === 3 && "pl-4",
              item.level > 3 && "pl-8"
            )}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn(
        "mb-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#84786d]",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-[#1f1b18]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1f1b18]">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

interface ApiMethodProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  className?: string;
}

export function ApiMethod({ method, className }: ApiMethodProps) {
  const styles = {
    GET: "border-[#bcc9d7] bg-[#e9eef3] text-[#35506a]",
    POST: "border-[#aab99b] bg-[#e7eee0] text-[#395034]",
    PUT: "border-[#d0b183] bg-[#f2e7d8] text-[#7a5418]",
    DELETE: "border-[#cca091] bg-[#f4e4de] text-[#8a4f43]",
    PATCH: "border-[#c5b7c8] bg-[#eee5ef] text-[#615067]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-3 py-1 text-xs font-bold tracking-[0.12em]",
        styles[method],
        className
      )}
    >
      {method}
    </span>
  );
}

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  className?: string;
}

export function LinkCard({ title, description, href, external = false, className }: LinkCardProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group block rounded-[1.45rem] border border-[#c7b8aa] bg-[#f6efe7] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#8d7e72] hover:bg-[#fbf7f1] hover:shadow-[0_22px_44px_-36px_rgba(31,27,24,0.38)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-[#1f1b18]">
            {title}
            {external && <ExternalLink className="h-4 w-4" />}
          </h3>
          <p className="text-sm leading-7 text-[#5b534b]">{description}</p>
        </div>
        <ChevronRight className="h-5 w-5 flex-shrink-0 text-[#84786d] transition-all group-hover:translate-x-1 group-hover:text-[#1f1b18]" />
      </div>
    </Link>
  );
}

interface CardGridProps {
  cols?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export function CardGrid({ cols = 2, children, className }: CardGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return <div className={cn("grid gap-6", gridCols[cols], className)}>{children}</div>;
}
