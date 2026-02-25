import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signToken } from "../lib/jwt.js";
import { AppError } from "../middleware/errorHandler.js";
import type { SignupInput, LoginInput } from "../schemas/auth.schema.js";

const prisma = new PrismaClient();

export async function signup(input: SignupInput) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
        throw new AppError(409, "A user with this email already exists");
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await prisma.user.create({
        data: {
            email: input.email,
            passwordHash,
            name: input.name,
        },
        select: { id: true, email: true, name: true, createdAt: true },
    });

    const token = signToken(user.id);
    return { user, token };
}

export async function login(input: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) {
        throw new AppError(401, "Invalid email or password");
    }

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
        throw new AppError(401, "Invalid email or password");
    }

    const token = signToken(user.id);
    return {
        user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },
        token,
    };
}

export async function getMe(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, createdAt: true },
    });
    if (!user) {
        throw new AppError(404, "User not found");
    }
    return user;
}
