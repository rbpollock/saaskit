"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export function SwaggerUIComponent() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/openapi.json")
      .then((res) => res.json())
      .then((data) => setSpec(data))
      .catch((err) => console.error("Failed to load OpenAPI spec:", err));
  }, []);

  if (!spec) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading API Documentation...</p>
        </div>
      </div>
    );
  }

  return <SwaggerUI spec={spec} />;
}
