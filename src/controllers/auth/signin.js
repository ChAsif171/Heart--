import Users from "../../models/users.js";
import { ApiError } from "../../utils/ApiError.js";
<<<<<<< Updated upstream
import print from "../../utils/print.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
import SEND_SANITIZED_SUCCESS_RESPONSE from "../../utils/sendSanitizedSuccessResponse.js";
import otpGenerator from "../../utils/otpGenerator.js"
import addMinutesToCurrentDate from "../../utils/addMinutesToCurrentDate.js";

async function SignIn(req, res, next) {
    try {
        const { email, password } = req.body;
        console.log("in sigin", req.body);
=======
//import { OtpTypes } from "../../constants/index.js";
import CheckIfAllRequiredFieldsArePresent from "../../utils/checkAllRequiredsField.js";
import print from "../../utils/print.js";
//import SendOtpWithNotification from "../../utils/SendOtpWithNotification.js";
//import chooseEmailTemplateAndMessage from "../../utils/chooseTemplateAndMessage.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
//import logger from "../../logger/index.js";

const arrayOfRequiredFields = ["email", "password"];
async function SignIn(req, res, next) {
    try {
        const { email, password } = req.body;
        const errors = CheckIfAllRequiredFieldsArePresent(req.body, arrayOfRequiredFields); // returns an object with all the errors
        if (Object.keys(errors).length > 0) {
            throw new ApiError("Invalid Credentials", 400, `Please fill out the required fields : ${Object.keys(errors)}`, true);
        }

>>>>>>> Stashed changes
        const userExists = await Users.findOne({ email: email.toLowerCase() });
        if (!userExists) throw new ApiError("Invalid Credentials", 400, "Incorrect Email or password", true);

        const userVerified = await userExists.bcryptComparePassword(password);
        if (!userVerified) {
            throw new ApiError("Invalid Cradentials", 400, "Incorrect email or Password", true);
        }
<<<<<<< Updated upstream
        const sanitizedUser = SEND_SANITIZED_SUCCESS_RESPONSE(userExists);
        const otp=otpGenerator();
        const otpExpiry=addMinutesToCurrentDate();

        const userExists1 = await Users.updateOne({ email: email.toLowerCase() },{otp,otpExpiry});
        if (!userExists1) throw new ApiError("Invalid Credentials", 400, "otp and otpExpiry not saved", true);


        return sendSuccessResponse(res, 200, true, "login successfully", "signinOtp", sanitizedUser);
=======

         //const response = await SendOtpWithNotification({ user: userExists, otpType: OtpTypes.SignIn,onEmail: true, resendOtp: false, templates: chooseEmailTemplateAndMessage("WelcomeAtSignup", "Login") });
        return sendSuccessResponse(res, 200, true,null, "signinOtp");
>>>>>>> Stashed changes
    } catch (error) {
        print("warn", error.message);
        next(error);
    }
}

export default SignIn;
