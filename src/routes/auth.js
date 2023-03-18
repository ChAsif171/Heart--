import express from "express";
import {SignUp,SignIn,ForgetPasswordEmail,VerifyOtp,ResetPassword} from "../controllers/auth/index.js"

const router = express.Router();
router.post("/signup",SignUp);
router.post("/login",SignIn);
router.post("/forget-password",ForgetPasswordEmail);
router.post("/verifyOtp",VerifyOtp);
router.post("/reset-password",ResetPassword);



export default router;
