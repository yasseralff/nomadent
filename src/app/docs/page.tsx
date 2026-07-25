"use client";

import { useEffect } from "react";

export default function DocsPage() {
  useEffect(() => {
    // Load Swagger UI CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/swagger-ui-dist@5/swagger-ui.css";
    document.head.appendChild(link);

    // Load Swagger UI JS Bundle
    const script = document.createElement("script");
    script.src = "https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.SwaggerUIBundle) {
        // @ts-ignore
        window.SwaggerUIBundle({
          url: "/api/docs",
          dom_id: "#swagger-ui",
          deepLinking: true,
          presets: [
            // @ts-ignore
            window.SwaggerUIBundle.presets.apis,
            // @ts-ignore
            window.SwaggerUIBundle.SwaggerUIStandalonePreset,
          ],
          layout: "BaseLayout",
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <a 
          href="/dashboard" 
          className="text-sm font-semibold text-primary hover:underline"
        >
          ← Back to Dashboard
        </a>
      </div>
      <div id="swagger-ui" />
    </div>
  );
}
