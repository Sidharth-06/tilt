import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

type RequestField = "body" | "query" | "params";

/**
 * Creates an Express middleware that validates a specific part of the request
 * against a Zod schema. Returns 400 with structured errors on failure.
 */
export function validate(schema: ZodSchema, field: RequestField = "body") {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const parsed = schema.parse(req[field]);
            // Replace the field with parsed (and potentially transformed) data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (req as any)[field] = parsed;
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).json({
                    error: "Validation failed",
                    details: err.errors.map((e) => ({
                        field: e.path.join("."),
                        message: e.message,
                    })),
                });
                return;
            }
            next(err);
        }
    };
}
