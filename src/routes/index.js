import express from "express";
import welcome from "./welcome.js";
import auth from "./auth.js";
import hdp from "./hdp.js";

const router = express.Router();

router.use("/welcome",welcome);
router.use("/auth",auth);
router.use("/heart",hdp);

export default router; 