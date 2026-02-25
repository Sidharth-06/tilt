import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service.js";

export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await authService.signup(req.body);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await authService.getMe(req.user!.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
}
