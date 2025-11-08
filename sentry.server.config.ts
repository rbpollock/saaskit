import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Filter out known/expected errors
  beforeSend(event, hint) {
    // Don't send errors for development
    if (process.env.NODE_ENV === "development") {
      return null;
    }

    // Filter out Prisma connection warming (not real errors)
    const error = hint.originalException;
    if (error && error instanceof Error) {
      if (error.message.includes("Prisma") && error.message.includes("warming")) {
        return null;
      }
    }

    return event;
  },

  // Environment
  environment: process.env.NODE_ENV || "development",

  // Additional server config
  integrations: [
    // Automatically tag transactions with user info
    Sentry.prismaIntegration(),
  ],
});
