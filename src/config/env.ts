const mode = process.env.NODE_ENV || "development";

export const baseURL = mode === "development" ? "/api" : "/";
export const APP_VERSION = "1.0.0";
