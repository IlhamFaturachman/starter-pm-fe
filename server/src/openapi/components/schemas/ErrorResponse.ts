import type { oas31 } from "openapi3-ts";

export const ErrorResponse: oas31.SchemaObject = {
  type: "object",
  properties: {
    success: { type: "boolean", example: false },
    message: { type: "string" },
    data: {
      type: "object",
      properties: {
        errors: {
          type: "object",
          additionalProperties: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
    },
  },
  required: ["success", "message", "data"],
};
