import type { oas31 } from "openapi3-ts";

export const Task: oas31.SchemaObject = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    title: { type: "string" },
    description: { type: "string" },
    status: { type: "string", enum: ["todo", "in_progress", "review", "done"] },
    projectId: { type: "string", format: "uuid" },
    assigneeId: {
      oneOf: [
        { type: "string", format: "uuid" },
        { type: "null" },
      ],
    },
    priority: { type: "string", enum: ["low", "medium", "high"] },
    order: { type: "integer" },
  },
};
