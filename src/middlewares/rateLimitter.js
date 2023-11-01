import rateLimit from "express-rate-limit"; // to prevent brute force attacks
import { RateLimitTimeFrame, RateLimit, RateLimitTypes } from "../constants/index.js";
import convertMsToHM from "../utils/convertMilisecondsToHours.js";
import print from "../utils/print.js";

function createMessage(requestType, time) {
    return {
        message: `Too many ${requestType} requests, please try again after ${convertMsToHM(time)}`,
        status: 429,
        success: false,
        error: true,
    };
}

function RateLimiter(maxRequests = RateLimit.HUNDRED, timeFrame = RateLimitTimeFrame.ONE_HOUR, message = createMessage(RateLimitTypes.NORMAL_API, RateLimitTimeFrame.ONE_HOUR)) {
    return rateLimit({
        windowMs: timeFrame,
        max: maxRequests,
        message,
        keyGenerator: (req) => print("ip address", req.ip),
    });
}

const CreateAccountRateLimiter = RateLimiter(RateLimit.FIVE, RateLimitTimeFrame.FIFTEEN_MINUTES, createMessage(RateLimitTypes.SIGNUP, RateLimitTimeFrame.FIFTEEN_MINUTES));
const LoginRateLimiter = RateLimiter(RateLimit.THREE, RateLimitTimeFrame.FIFTEEN_MINUTES, createMessage(RateLimitTypes.LOGIN, RateLimitTimeFrame.FIFTEEN_MINUTES));
const ForgotPasswordRateLimiter = RateLimiter(RateLimit.THREE, RateLimitTimeFrame.FIFTEEN_MINUTES, createMessage(RateLimitTypes.FORGOT_PASSWORD, RateLimitTimeFrame.FIFTEEN_MINUTES));
const ResetPasswordRateLimiter = RateLimiter(RateLimit.THREE, RateLimitTimeFrame.FIFTEEN_MINUTES, createMessage(RateLimitTypes.RESET_PASSWORD, RateLimitTimeFrame.FIFTEEN_MINUTES));
const APIRateLimiter = RateLimiter(RateLimit.HUNDRED, RateLimitTimeFrame.ONE_HOUR, createMessage(RateLimitTypes.NORMAL_API, RateLimitTimeFrame.ONE_HOUR));
const AuthRateLimiter = RateLimiter(RateLimit.FIVE, RateLimitTimeFrame.FIFTEEN_MINUTES, createMessage(RateLimitTypes.NORMAL_API, RateLimitTimeFrame.FIFTEEN_MINUTES));

export {
    CreateAccountRateLimiter,
    LoginRateLimiter,
    ForgotPasswordRateLimiter,
    ResetPasswordRateLimiter,
    APIRateLimiter,
    AuthRateLimiter,
};
