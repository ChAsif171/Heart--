import express from "express";
import {heart,predection} from "../controllers/hdp/index.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import Users from "../models/users.js";

const router = express.Router();
router.post("/disease",heart);
router.post("/nn",predection);

export default router;
