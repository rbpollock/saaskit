import { SwaggerUIComponent } from "@/components/swagger-ui";

export const metadata = {
  title: "API Documentation - AI SaaS Starter Kit",
  description: "Interactive API documentation with Swagger UI",
};

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
          <p className="text-muted-foreground">
            Interactive API documentation for the AI SaaS Starter Kit
          </p>
        </div>
      </div>
      <SwaggerUIComponent />
    </div>
  );
}
