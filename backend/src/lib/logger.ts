type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    [key: string]: unknown;
}

function formatEntry(level: LogLevel, message: string, meta?: Record<string, unknown>): LogEntry {
    return {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...meta,
    };
}

export const logger = {
    info(message: string, meta?: Record<string, unknown>) {
        console.log(JSON.stringify(formatEntry("info", message, meta)));
    },
    warn(message: string, meta?: Record<string, unknown>) {
        console.warn(JSON.stringify(formatEntry("warn", message, meta)));
    },
    error(message: string, meta?: Record<string, unknown>) {
        console.error(JSON.stringify(formatEntry("error", message, meta)));
    },
    debug(message: string, meta?: Record<string, unknown>) {
        if (process.env.NODE_ENV !== "production") {
            console.debug(JSON.stringify(formatEntry("debug", message, meta)));
        }
    },
};
