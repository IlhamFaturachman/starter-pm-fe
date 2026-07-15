import type { oas31 } from "openapi3-ts";

export const tasksPath: Record<string, oas31.PathItemObject> = {
  "/api/tasks/{taskId}": {
    patch: {
      tags: ["Tasks"],
      summary: "Update an existing task",
      description: "Updates fields of a task, optionally moving it or changing its order/status.",
      parameters: [
        { name: "taskId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
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
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Task updated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Task" },
            },
          },
        },
        "404": {
          description: "Task not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
};
