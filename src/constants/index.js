import { Login, VerifyMobile } from "../templates/otp-messages.js";
import VerifyEmail from "../templates/verify-email.js";
import WelcomeAtSignup from "../templates/welcome-at-signup.js";
import ForgetPasswordEmail from "../templates/forget-password.js";

const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
};

const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: "white",
        debug: "green",
        info: "green",
        warn: "yellow",
        error: "red",
        fatal: "red",
    },
};

const RoleTypes = Object.freeze({
    USER: "user",
    ADMIN: "admin",
});


const RateLimitTimeFrame = Object.freeze({
    ONE_MINUTE: 60 * 1000,
    FIFTEEN_MINUTES: 15 * 60 * 1000,
    ONE_HOUR: 60 * 60 * 1000,
});

const Status = Object.freeze({
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
    PENDING: "PENDING",
    CANCELLED: "CANCELLED",
    REJECTED: "REJECTED",
    REFUNDED: "REFUNDED",
});
const RateLimitTypes = Object.freeze({
    SIGNUP: "Signup",
    LOGIN: "Login",
    FORGOT_PASSWORD: "Forgot Password",
    RESET_PASSWORD: "Reset Password",
    VERIFY_EMAIL: "Verify Email",
    RESEND_EMAIL: "Resend Email",
    CHANGE_PASSWORD: "Change Password",
    NORMAL_API: "API",
});
const RateLimit = Object.freeze({
    ONE: 1,
    THREE: 3,
    FIVE: 5,
    TEN: 10,
    FIFTY: 50,
    HUNDRED: 100,
});
const OtpTypes = Object.freeze({
    ForgetPasswordEmail: "forgetPasswordEmail",
    ForgetPasswordNumber: "forgetPasswordNumber",
    VerifyEmail: "verifyEmail",
    VerifyMobile: "verifyMobile",
    Transaction: "transaction",
    Signin: "signin",
    DeletePayee: "deletePayee",
    ViewPin: "viewPin",
    UpdatePin: "updatePin",
    CancelCard: "cancelCard",
    DeleteAccount: "deleteAccount",
    DirectDebit: "directDebit",
    SignIn: "SignIn",
});

const EmailTemplates = Object.freeze({
    VerifyEmail,
    WelcomeAtSignup,
    ForgetPasswordEmail,

});

const OtpMessage = Object.freeze({
    Login,
    VerifyMobile,
});
export {
    HttpStatusCode,
    customLevels,
    RateLimitTimeFrame,
    Status,
    RoleTypes,
    OtpMessage,
    EmailTemplates,
    OtpTypes,
    RateLimit,
    RateLimitTypes
}