import express from "express";
import { sequelize } from "../store/db";
import { sendSuccess, sendError } from "../utils/response";

const router = express.Router();

router.get("/", async (_req, res) => {
  let dbStatus: "connected" | "disconnected" = "disconnected";
  try {
    await sequelize.authenticate();
    dbStatus = "connected";
  } catch {
    dbStatus = "disconnected";
  }

  const status = dbStatus === "connected" ? "ok" : "degraded";
  const code = dbStatus === "connected" ? 200 : 503;

  const data = {
    status,
    timestamp: new Date().toISOString(),
    db: dbStatus,
  };

  if (code === 200) {
    sendSuccess(res, "Service healthy", data);
  } else {
    sendError(res, "Service degraded", code, data);
  }
});

export default router;
