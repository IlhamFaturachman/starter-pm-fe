import { Router } from "express";
import { z } from "zod";
import { Task } from "../store/db";
import { authenticate, requirePermission, validateRequest } from "../middlewares/auth";
import { socketService } from "../utils/socket";
import { sendError } from "../utils/response";

const router = Router();

const patchTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "review", "done"]).optional(),
  projectId: z.string().uuid().optional(),
  assigneeId: z.string().uuid().nullable().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  order: z.number().int().nonnegative().optional(),
});

// ── PATCH /api/tasks/:taskId ────────────────────────────────
router.patch("/:taskId", authenticate, requirePermission("kanban.update"), validateRequest(patchTaskSchema), async (req, res) => {
  try {
    const taskId = req.params.taskId as string;
    if (!/^[0-9a-fA-F-]{36}$/.test(taskId)) {
      return sendError(res, "Invalid task ID format", 400);
    }

    const task = await Task.findByPk(taskId);
    if (!task) {
      return sendError(res, "Task not found", 404);
    }

    const oldProjectId = task.projectId;
    const updates = req.body;

    await task.update(updates);

    const hasMovedProject = updates.projectId && updates.projectId !== oldProjectId;

    if (hasMovedProject) {
      socketService.broadcastTaskMoved(task);
    } else {
      socketService.broadcastTaskUpdated(task);
    }

    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    sendError(res, "Failed to update task", 500);
  }
});

export default router;
