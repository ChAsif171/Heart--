import express from "express";
import welcome from "./welcome.js";

const router = express.Router();

router.use("/welcome",welcome);

export default router; 