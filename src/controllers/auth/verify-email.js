//import SendOtpWithNotification from "../../utils/SendOtpWithNotification.js";
//import { OtpTypes } from "../../constants/index.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
//import chooseEmailTemplateAndMessage from "../../utils/chooseTemplateAndMessage.js";

async function EmailVerify(req, res, next) {
    try {
        const { user } = req;
        // if email is already verified
        if (user.emailVerified) {
            throw new ApiError("already verified", 400, "Email is already verified", true);
        }
        // now update the user
        user.emailVerified = true;
        await user.save();
        //await SendOtpWithNotification({ user, otpType: OtpTypes.VerifyMobile, onEmail: false, onMobile: true, templates: chooseEmailTemplateAndMessage("WelcomeAtSignup", false, false) });
        return sendSuccessResponse(res, 202, true, "Email is verified", null);
    } catch (error) {
        next(error);
    }
}

export default EmailVerify;
