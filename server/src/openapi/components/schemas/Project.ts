import type { oas31 } from "openapi3-ts";

export const Project: oas31.SchemaObject = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
    description: { type: "string" },
    status: { type: "string", enum: ["active", "archived"] },
    ownerId: { type: "string", format: "uuid" },
    createdAt: { type: "string", format: "date-time" },
  },
};
