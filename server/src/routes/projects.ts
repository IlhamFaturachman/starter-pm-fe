import { Router } from "express";
import { z } from "zod";
import { Project, Task } from "../store/db";
import { authenticate, requirePermission, validateRequest } from "../middlewares/auth";
import { socketService } from "../utils/socket";
import { sendError } from "../utils/response";

const router = Router();

const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
});

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().default(""),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  assigneeId: z.string().uuid().nullable().optional(),
  order: z.number().int().nonnegative(),
});

// ── GET /api/projects ──────────────────────────────────────
router.get("/", authenticate, requirePermission("projects.read"), async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    sendError(res, "Failed to retrieve projects", 500);
  }
});

// ── POST /api/projects ─────────────────────────────────────
router.post("/", authenticate, requirePermission("projects.create"), validateRequest(createProjectSchema), async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.create({
      name,
      description,
      status: "active",
      ownerId: req.user!.id,
    });

    // Broadcast Socket.IO event
    socketService.broadcastProjectCreated(project);

    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    sendError(res, "Failed to create project", 500);
  }
});

// ── GET /api/projects/:projectId/tasks ─────────────────────
router.get("/:projectId/tasks", authenticate, requirePermission("kanban.read"), async (req, res) => {
  try {
    const projectId = req.params.projectId as string;
    if (!/^[0-9a-fA-F-]{36}$/.test(projectId)) {
      return sendError(res, "Invalid project ID format", 400);
    }

    const project = await Project.findByPk(projectId);
    if (!project) {
      return sendError(res, "Project not found", 404);
    }

    const tasks = await Task.findAll({
      where: { projectId },
      order: [["order", "ASC"]],
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching project tasks:", error);
    sendError(res, "Failed to retrieve project tasks", 500);
  }
});

// ── POST /api/projects/:projectId/tasks ────────────────────
router.post("/:projectId/tasks", authenticate, requirePermission("kanban.update"), validateRequest(createTaskSchema), async (req, res) => {
  try {
    const projectId = req.params.projectId as string;
    if (!/^[0-9a-fA-F-]{36}$/.test(projectId)) {
      return sendError(res, "Invalid project ID format", 400);
    }

    const project = await Project.findByPk(projectId);
    if (!project) {
      return sendError(res, "Project not found", 404);
    }

    const { title, description, priority, assigneeId, order } = req.body;
    const task = await Task.create({
      title,
      description,
      status: "todo",
      projectId,
      assigneeId: assigneeId ?? null,
      priority,
      order,
    });

    // Broadcast Socket.IO event
    socketService.broadcastTaskCreated(task);

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    sendError(res, "Failed to create task", 500);
  }
});

export default router;
