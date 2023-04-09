import express from "express";
import {heart} from "../controllers/hdp/index.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import Users from "../models/users.js";

const router = express.Router();
router.post("/disease",authMiddleware(Users),heart);

export default router;
