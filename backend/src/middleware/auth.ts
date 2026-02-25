import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt.js";
import { logger } from "../lib/logger.js";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing or invalid authorization header" });
        return;
    }

    try {
        const token = header.slice(7);
        const payload = verifyToken(token);
        req.user = { id: payload.userId };
        next();
    } catch {
        logger.warn("Invalid JWT token", { ip: req.ip });
        res.status(401).json({ error: "Invalid or expired token" });
    }
}
