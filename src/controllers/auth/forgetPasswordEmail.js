import Users from "../../models/users.js";
//import { OtpTypes } from "../../constants/index.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
// import SendOtpWithNotification from "../../utils/SendOtpWithNotification.js";
// import chooseEmailTemplateAndMessage from "../../utils/chooseTemplateAndMessage.js";
import SEND_SANITIZED_SUCCESS_RESPONSE from "../../utils/sendSanitizedSuccessResponse.js";
import otpGenerator from "../../utils/otpGenerator.js"
import addMinutesToCurrentDate from "../../utils/addMinutesToCurrentDate.js";
async function ForgetPasswordEmail(req, res, next) {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            throw new ApiError("Invalid Cradentials", 400, "User does'nt exists with this email!", true);
        }
        const otp = otpGenerator();
       user.otpExpiry = addMinutesToCurrentDate(15);
       user.otp=otp;
       user.otpVerified=false;
       await user.save();
        return sendSuccessResponse(res, 200, true, "Password Reset Token has been sent to your email","forget Password ");
    } catch (error) {
        next(error);
    }
}

export default ForgetPasswordEmail;
