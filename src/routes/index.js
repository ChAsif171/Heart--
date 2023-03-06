import express from "express";
import welcome from "./welcome.js";
import auth from "./auth.js"

const router = express.Router();

router.use("/welcome",welcome);
router.use("/auth",auth);

export default router; 