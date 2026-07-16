import type { oas31 } from "openapi3-ts";

export const projectsPath: Record<string, oas31.PathItemObject> = {
  "/api/projects": {
    get: {
      tags: ["Projects"],
      summary: "List all projects",
      description: "Returns a list of all projects ordered by creation date.",
      responses: {
        "200": {
          description: "List of projects",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Project" },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Projects"],
      summary: "Create a new project",
      description: "Creates a project owned by the authenticated user.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "description"],
              properties: {
                name: { type: "string" },
                description: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Project created",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Project" },
            },
          },
        },
        "400": {
          description: "Validation failed",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/projects/{projectId}/tasks": {
    get: {
      tags: ["Projects", "Tasks"],
      summary: "List tasks for a project",
      description: "Returns all tasks belonging to the specified project.",
      parameters: [
        { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      responses: {
        "200": {
          description: "List of tasks",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Task" },
              },
            },
          },
        },
        "404": {
          description: "Project not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    post: {
      tags: ["Projects", "Tasks"],
      summary: "Create a task under a project",
      description: "Creates a new task in the specified project.",
      parameters: [
        { name: "projectId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["title", "order"],
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                priority: { type: "string", enum: ["low", "medium", "high"], default: "low" },
                assigneeId: {
                  oneOf: [
                    { type: "string", format: "uuid" },
                    { type: "null" },
                  ],
                },
                order: { type: "integer" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Task created",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Task" },
            },
          },
        },
        "404": {
          description: "Project not found",
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
