import { getApiDocs } from "@/lib/swagger";

export const metadata = {
  title: "API Documentation - AI SaaS Starter Kit",
  description: "Interactive API documentation with Swagger UI",
};

export default async function ApiDocsPage() {
  const spec = await getApiDocs();

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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-lg border p-6">
          <pre className="overflow-auto text-sm">
            {JSON.stringify(spec, null, 2)}
          </pre>
        </div>
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm">
            <strong>💡 Tip:</strong> Copy this OpenAPI specification and import it into{" "}
            <a
              href="https://www.postman.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Postman
            </a>
            ,{" "}
            <a
              href="https://insomnia.rest/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Insomnia
            </a>
            , or{" "}
            <a
              href="https://editor.swagger.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Swagger Editor
            </a>
            {" "}to test the APIs interactively.
          </p>
        </div>
      </div>
    </div>
  );
}
