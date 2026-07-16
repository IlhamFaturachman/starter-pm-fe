import type { oas31 } from "openapi3-ts";

const healthDataSchema = {
  type: "object",
  properties: {
    status: { type: "string", example: "ok" },
    timestamp: { type: "string", format: "date-time" },
    db: { type: "string", example: "connected" },
  },
};

export const healthPath: Record<string, oas31.PathItemObject> = {
  "/api/health": {
    get: {
      tags: ["Health"],
      summary: "Check server health",
      description:
        "Returns the server status, database connectivity, and current timestamp.",
      responses: {
        "200": {
          description: "Server is healthy",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Service healthy" },
                  data: healthDataSchema,
                },
                required: ["success", "message", "data"],
              },
            },
          },
        },
        "503": {
          description: "Server is degraded (DB disconnected)",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "Service degraded" },
                  data: {
                    ...healthDataSchema,
                    properties: {
                      ...healthDataSchema.properties,
                      status: { type: "string", example: "degraded" },
                      db: { type: "string", example: "disconnected" },
                    },
                  },
                },
                required: ["success", "message", "data"],
              },
            },
          },
        },
      },
    },
  },
};
