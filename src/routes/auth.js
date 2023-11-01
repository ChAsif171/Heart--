import express from "express";
<<<<<<< Updated upstream
import {SignUp,SignIn,ForgetPasswordEmail,VerifyOtp,ResetPassword} from "../controllers/auth/index.js"

const router = express.Router();
router.post("/signup",SignUp);
router.post("/login",SignIn);
router.post("/forget-password",ForgetPasswordEmail);
router.post("/verifyOtp",VerifyOtp);
router.post("/reset-password",ResetPassword);


=======
import { CreateAccountRateLimiter, LoginRateLimiter, AuthRateLimiter } from "../middlewares/rateLimitter.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {SignUp,SignIn,VerifyOtp,ForgetPasswordEmail,ResetPassword,EmailVerify} from "../controllers/auth/index.js"
import Users from "../models/users.js";
import IsOtpVerified from "../middlewares/isOtpVerified.js";
import VerifyOtpMiddleware from "../middlewares/verifyOtpMiddleWare.js";

const router = express.Router();
router.post("/signup", CreateAccountRateLimiter,SignUp);
router.post("/signin", LoginRateLimiter,SignIn);
router.post("/verify-otp", VerifyOtp);
router.post("/forget-password", AuthRateLimiter, ForgetPasswordEmail);
router.post("/reset-password", AuthRateLimiter, IsOtpVerified, ResetPassword);
router.post("/verify-email", authMiddleware(Users), VerifyOtpMiddleware,EmailVerify);
 
>>>>>>> Stashed changes

export default router;
