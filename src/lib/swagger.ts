import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "AI SaaS Starter Kit API",
        version: "1.0.0",
        description:
          "Production-ready Next.js 15 AI SaaS API with authentication, billing, and AI integration. This API provides endpoints for user registration, Stripe payment processing, and webhook handling.",
        contact: {
          name: "API Support",
          email: "support@example.com",
        },
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
        {
          url: "https://yourdomain.com",
          description: "Production server",
        },
      ],
      tags: [
        {
          name: "Authentication",
          description:
            "User authentication and registration endpoints. Handle user registration with email/password and OAuth providers (Google, GitHub).",
        },
        {
          name: "Billing",
          description:
            "Stripe checkout and subscription management. Create checkout sessions for plan purchases and manage subscriptions.",
        },
        {
          name: "Webhooks",
          description:
            "External service webhooks. Receive and process events from Stripe for payment confirmations and subscription updates.",
        },
      ],
      components: {
        securitySchemes: {
          sessionAuth: {
            type: "apiKey",
            in: "cookie",
            name: "authjs.session-token",
            description:
              "Session-based authentication using NextAuth. After signing in, the session cookie will be automatically included in requests.",
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
