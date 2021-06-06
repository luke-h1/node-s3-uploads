declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    CORS_ORIGIN: string;
    FRONTEND_URL: string;
    AWS_BUCKET_NAME: string;
    AWS_BUCKET_REGION: string;
    AWS_ACCESS_KEY: string;
    AWS_ACCESS_SECRET: string;
  }
}
