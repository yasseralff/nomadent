import { NextResponse } from "next/server";
import { createSwaggerSpec } from "next-swagger-doc";

export async function GET() {
  try {
    const spec = createSwaggerSpec({
      apiFolder: "src/app/api",
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Nomadent API Documentation",
          version: "1.0.0",
          description: "API endpoints for the Nomadent international student portal",
        },
        components: {
          securitySchemes: {
            sessionAuth: {
              type: "apiKey",
              in: "cookie",
              name: "next-auth.session-token",
              description: "Auth.js session cookie token",
            },
          },
        },
        security: [
          {
            sessionAuth: [],
          },
        ],
      },
    });

    return NextResponse.json(spec);
  } catch (error: any) {
    console.error("[Swagger API Route Error]:", error);
    return NextResponse.json({ error: "Failed to generate API docs" }, { status: 500 });
  }
}
