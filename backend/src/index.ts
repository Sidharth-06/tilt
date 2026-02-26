import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { logger } from "./lib/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import { referralRouter, convertRouter, eventsListRouter } from "./routes/event.routes.js";

const app = express();

// --- Global Middleware ---
const allowedOrigins = config.FRONTEND_URL.split(",").map((o) => o.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Request logging
app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.path}`, { ip: req.ip });
    next();
});

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/campaigns", aiRoutes); // mounts /:id/insights under /api/campaigns
app.use("/api/campaigns/:id/events", eventsListRouter);
app.use("/r", referralRouter);
app.use("/api/convert", convertRouter);

// Health check
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- Error Handler (must be last) ---
app.use(errorHandler);

// --- Start (skip in serverless) ---
if (!process.env.VERCEL) {
    app.listen(config.PORT, () => {
        logger.info(`Server running on port ${config.PORT}`, { port: config.PORT });
    });
}

export default app;
