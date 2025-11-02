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
          "Production-ready Next.js 15 AI SaaS API with authentication, billing, and AI integration. This comprehensive API provides endpoints for user management, blog content management, payment processing, subscription handling, and webhook integration.",
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
          name: "Users",
          description:
            "User management endpoints. Create, read, update, and delete users. Manage user roles and permissions. Requires ADMIN or SUPER_ADMIN role.",
        },
        {
          name: "Blogs",
          description:
            "Blog content management endpoints. Create, read, update, and delete blog posts. Manage blog categories and publishing status. Public users can read published posts, admins can manage all posts.",
        },
        {
          name: "Categories",
          description:
            "Blog category management endpoints. Create, read, update, and delete categories. Public endpoint for reading, admin role required for modifications.",
        },
        {
          name: "Plans",
          description:
            "Subscription plan management endpoints. View available subscription plans with pricing and features. Public endpoint.",
        },
        {
          name: "Subscriptions",
          description:
            "Subscription management endpoints. View and cancel subscriptions. Users can manage their own subscriptions, admins can manage all subscriptions.",
        },
        {
          name: "Payments",
          description:
            "Payment history and transaction management. View payment records and transaction details. Users can view their own payments, admins can view all payments.",
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
