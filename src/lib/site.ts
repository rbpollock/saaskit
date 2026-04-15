export const siteConfig = {
  name: "irl.coop",
  title: "irl.coop Community OS",
  description:
    "The sovereign stack for decentralized cooperatives. Privacy-first, open-source infrastructure for identity, communication, and productivity.",
  keywords: [
    "irl.coop",
    "community os",
    "decentralized cooperative",
    "sovereign stack",
    "lit protocol auth",
    "privacy-first infrastructure",
    "open source cooperative",
    "federated identity",
    "data sovereignty",
    "coop tech",
  ],
};

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  try {
    const normalized = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
    return new URL(normalized).origin;
  } catch {
    return "http://localhost:3000";
  }
}
