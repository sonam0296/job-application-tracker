import dotenv from "dotenv";

// Load env file automatically when using dotenv-cli
dotenv.config();

function required(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`❌ Missing required env variable: ${key}`);
  }
  return value;
}
export const config = {
  app: {
    port: Number(process.env.PORT) || 8000,
    nodeEnv: process.env.NODE_ENV || "development",
  },
  db: {
    user: required("POSTGRES_USER", "postgres"),
    password: required("POSTGRES_PASSWORD", "postgres"),
    name: required("POSTGRES_DB", "job_tracker"),
    host: required("POSTGRES_HOST", "localhost"),
    port: Number(process.env.POSTGRES_PORT) || 5432,
  },
  jwt: {
    secret: required("JWT_SECRET", "supersecret"),
    refreshSecret: required("JWT_REFRESH_SECRET", "refreshsecret"),
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
  },
};
