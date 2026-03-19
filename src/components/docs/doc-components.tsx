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
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Callout Component
interface CalloutProps {
  type?: "info" | "warning" | "success" | "danger" | "note";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ type = "info", title, children, className }: CalloutProps) {
  const styles = {
    info: {
      container: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900",
      icon: "text-blue-600 dark:text-blue-400",
      title: "text-blue-900 dark:text-blue-300",
      Icon: Info,
    },
    warning: {
      container: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900",
      icon: "text-yellow-600 dark:text-yellow-400",
      title: "text-yellow-900 dark:text-yellow-300",
      Icon: AlertTriangle,
    },
    success: {
      container: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900",
      icon: "text-green-600 dark:text-green-400",
      title: "text-green-900 dark:text-green-300",
      Icon: CheckCircle2,
    },
    danger: {
      container: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900",
      icon: "text-red-600 dark:text-red-400",
      title: "text-red-900 dark:text-red-300",
      Icon: AlertCircle,
    },
    note: {
      container: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900",
      icon: "text-purple-600 dark:text-purple-400",
      title: "text-purple-900 dark:text-purple-300",
      Icon: Info,
    },
  };

  const style = styles[type];

  return (
    <div className={cn("rounded-lg border-l-4 p-4 my-6", style.container, className)}>
      <div className="flex gap-3">
        <style.Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", style.icon)} />
        <div className="flex-1">
          {title && (
            <h5 className={cn("font-semibold mb-1", style.title)}>
              {title}
            </h5>
          )}
          <div className="text-sm leading-relaxed [&>p]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Code Block Component
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
  className
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className={cn("rounded-xl border bg-zinc-950 dark:bg-zinc-900 overflow-hidden my-6 shadow-lg", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
          <span className="text-sm font-medium text-zinc-300">{title}</span>
          <span className="text-xs text-zinc-500 uppercase">{language}</span>
        </div>
      )}
      <div className="relative group">
        <button
          onClick={copyToClipboard}
          className="absolute right-4 top-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-zinc-100 font-mono">
            {showLineNumbers ? (
              <div className="flex">
                <div className="select-none pr-4 text-zinc-600 text-right">
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1">
                  {lines.map((line, i) => (
                    <div
                      key={i}
                      className={cn(
                        highlightLines.includes(i + 1) && "bg-blue-500/10 -mx-4 px-4 border-l-2 border-blue-500"
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

// Inline Code Component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-pink-600 dark:text-pink-400 font-mono text-sm border border-zinc-200 dark:border-zinc-700">
      {children}
    </code>
  );
}

// Badge Component
interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
  children: React.ReactNode;
  className?: string;
}

export function DocBadge({ variant = "default", children, className }: BadgeProps) {
  const styles = {
    default: "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200",
    success: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
    warning: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    danger: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
    info: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    purple: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", styles[variant], className)}>
      {children}
    </span>
  );
}

// Feature Card Component
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
        <div className={cn(
          "p-3 rounded-xl shadow-lg",
          gradient || "bg-[#1f1b18] text-[#f3eadf]"
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className={cn(
        "absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full rounded-full",
        gradient || "bg-[#1f1b18]"
      )} />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "group relative overflow-hidden rounded-xl border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block",
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm", className)}>
      {content}
    </div>
  );
}

// Steps Component
interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return (
    <div className={cn("space-y-6 my-8", className)}>
      {children}
    </div>
  );
}

interface StepProps {
  step: number;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Step({ step, title, children, className }: StepProps) {
  return (
    <div className={cn("relative pl-10 pb-8 border-l-2 border-zinc-200 dark:border-zinc-800 last:border-0 last:pb-0", className)}>
      <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#1f1b18] text-white font-bold text-sm shadow-lg">
        {step}
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="text-muted-foreground text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

// Table of Contents Component
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
    <div className={cn("sticky top-24 space-y-2", className)}>
      <h4 className="font-semibold text-sm mb-4 text-foreground">On This Page</h4>
      <nav className="space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block text-sm text-muted-foreground hover:text-foreground transition-colors py-1",
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

// Breadcrumbs Component
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
    <nav className={cn("flex items-center space-x-2 text-sm text-muted-foreground mb-6", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

// API Method Badge
interface ApiMethodProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  className?: string;
}

export function ApiMethod({ method, className }: ApiMethodProps) {
  const styles = {
    GET: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700",
    POST: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700",
    PUT: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
    DELETE: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700",
    PATCH: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700",
  };

  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border", styles[method], className)}>
      {method}
    </span>
  );
}

// Link Card Component
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
        "group block p-6 rounded-xl border bg-card hover:bg-muted/50 transition-all duration-200 hover:shadow-lg hover:border-primary/50",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
            {title}
            {external && <ExternalLink className="h-4 w-4" />}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
    </Link>
  );
}

// Grid Layout for Cards
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

  return (
    <div className={cn("grid gap-6", gridCols[cols], className)}>
      {children}
    </div>
  );
}
