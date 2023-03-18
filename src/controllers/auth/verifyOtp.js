import Users from "../../models/users.js";
import SEND_SANITIZED_SUCCESS_RESPONSE from "../../utils/sendSanitizedSuccessResponse.js";
import signJwtToken from "../../utils/signJWT.js";
// import SetOtpValues from "../../utils/setOtpValues.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";

async function VerifyOtp(req, res, next) {
    try {
        const { otp, email, type } = req.body;

        const user = await Users.findOne({ email, otp /* ,otpType: OtpTypes.Signin */ });
        if (!user) {
            throw new ApiError("Invalid Details", 400, "User not found or generate a new otp", true);
        }

        const currentTime = new Date().getTime();
        if (user.otpExpiry < currentTime) {
          // await SetOtpValues(user, false);
            throw new ApiError("Invalid Details", 400, "OTP is expired!", true);
        }

        if (user.otp !== otp) {
            throw new ApiError("Invalid Details", 400, "OTP is invalid!", true);
        }

        // if otp is valid and hasnt expired and type is signin then return the user and token
        if (type === "signin") {
            //await SetOtpValues(user, false);
            const sanitizedUser = SEND_SANITIZED_SUCCESS_RESPONSE(user);
            const token = signJwtToken(user._id);
            const finalResponse = { ...sanitizedUser, token };
            return sendSuccessResponse(res, 200, true, "Login succesfull", "login", finalResponse);
        }
        // means otp is valid and hasnt expired
        user.otpVerified = true;
        await user.save();
        const sanitizedUser = SEND_SANITIZED_SUCCESS_RESPONSE(user);
        const token = signJwtToken(user._id);
        const finalResponse = { ...sanitizedUser, token };
        return sendSuccessResponse(res, 200, true, "Otp Verified","verify Otp",finalResponse);
    } catch (error) {
        next(error);
    }
}

export default VerifyOtp;
