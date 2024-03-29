import dotenv from "dotenv";

dotenv.config({path: `.env.${process.env.NODE_ENV}`});

export default{
    PORT: process.env.PORT,
    DATABASE:{
        URL:process.env.MONGODB_URL,
    },
    REDIS: {
        HOST: process.env.REDIS_HOST,
        PORT: process.env.REDIS_PORT,
        PASSWORD: process.env.REDIS_PASSWORD,
        DB: process.env.REDIS_DB,
    },
    JWT: {
        SECRET: process.env.JWT_SECRET,
        TOKEN_EXPIRY: "30d",
        VERIFY_EMAIL_TOKEN_EXPIRY: "15m",
    },
    SENDGRID: {
        API_SECRET: process.env.SENDGRID_API_KEY,
        FROM: process.env.SENDGRID_FROM_EMAIL,
    },
    REDIS: {
        HOST: process.env.REDIS_HOST,
        PORT: process.env.REDIS_PORT,
        PASSWORD: process.env.REDIS_PASSWORD,
        DB: process.env.REDIS_DB,
    },
    BULK_SMS: {
        API_KEY: process.env.BULKSMS_API_KEY,
    }
};