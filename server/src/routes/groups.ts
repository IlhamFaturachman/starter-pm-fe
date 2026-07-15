import { z } from "zod";
import express from "express";
import { Group, Permission, GroupPermission } from "../store/db";
import { sendSuccess, sendError, sendValidationError } from "../utils/response";
import { formatZodErrors } from "../utils/validation";

const router = express.Router();

// ── Schemas ────────────────────────────────────────────────
const createGroupSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(""),
});

const updateGroupSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

const assignPermissionsSchema = z.object({
  permissionIds: z.array(z.string().uuid()),
});

// ── GET / — list all groups ────────────────────────────────
router.get("/", async (_req, res) => {
  const groups = await Group.findAll({
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "name", "action"] }],
    order: [["name", "ASC"]],
  });
  sendSuccess(res, "Groups retrieved", groups);
});

// ── POST / — create group ──────────────────────────────────
router.post("/", async (req, res) => {
  const result = createGroupSchema.safeParse(req.body);
  if (!result.success) {
    return sendValidationError(res, formatZodErrors(result.error));
  }

  const existing = await Group.findOne({ where: { name: result.data.name } });
  if (existing) {
    return sendError(res, "Group name already exists", 400);
  }

  const group = await Group.create(result.data);
  sendSuccess(res, "Group created", group, 201);
});

// ── GET /:id — group detail with permissions ───────────────
router.get("/:id", async (req, res) => {
  const group = await Group.findByPk(req.params.id, {
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "name", "action"] }],
  });

  if (!group) {
    return sendError(res, "Group not found", 404);
  }

  sendSuccess(res, "Group retrieved", group);
});

// ── PUT /:id — update group ────────────────────────────────
router.put("/:id", async (req, res) => {
  const group = await Group.findByPk(req.params.id);
  if (!group) {
    return sendError(res, "Group not found", 404);
  }

  const result = updateGroupSchema.safeParse(req.body);
  if (!result.success) {
    return sendValidationError(res, formatZodErrors(result.error));
  }

  if (result.data.name) {
    const existing = await Group.findOne({ where: { name: result.data.name } });
    if (existing && existing.id !== group.id) {
      return sendError(res, "Group name already exists", 400);
    }
  }

  await group.update(result.data);
  sendSuccess(res, "Group updated", group);
});

// ── DELETE /:id — delete group ─────────────────────────────
router.delete("/:id", async (req, res) => {
  const group = await Group.findByPk(req.params.id);
  if (!group) {
    return sendError(res, "Group not found", 404);
  }

  await GroupPermission.destroy({ where: { groupId: group.id } });
  await group.destroy();
  sendSuccess(res, "Group deleted");
});

// ── PUT /:id/permissions — assign permissions (replace all) ─
router.put("/:id/permissions", async (req, res) => {
  const group = await Group.findByPk(req.params.id);
  if (!group) {
    return sendError(res, "Group not found", 404);
  }

  const result = assignPermissionsSchema.safeParse(req.body);
  if (!result.success) {
    return sendValidationError(res, formatZodErrors(result.error));
  }

  // verify all permissionIds exist
  const permissions = await Permission.findAll({ where: { id: result.data.permissionIds } });
  if (permissions.length !== result.data.permissionIds.length) {
    return sendError(res, "One or more permission IDs are invalid", 400);
  }

  // replace all
  await GroupPermission.destroy({ where: { groupId: group.id } });
  await GroupPermission.bulkCreate(
    result.data.permissionIds.map((permissionId) => ({
      groupId: group.id,
      permissionId,
    })),
  );

  const updated = await Group.findByPk(group.id, {
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "name", "action"] }],
  });

  sendSuccess(res, "Permissions updated", updated);
});

export default router;
