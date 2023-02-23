import dotenv from "dotenv";

dotenv.config({path: `.env.${process.env.NODE_ENV}`});

export default{
    PORT: process.env.PORT,
    DATABASE:{
        URL:process.env.MONGODB_URL,
    },
};