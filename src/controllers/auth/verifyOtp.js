import Users from "../../models/users.js";
import SEND_SANITIZED_SUCCESS_RESPONSE from "../../utils/sendSanitizedSuccessResponse.js";
import signJwtToken from "../../utils/signJWT.js";
<<<<<<< Updated upstream
// import SetOtpValues from "../../utils/setOtpValues.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";

async function VerifyOtp(req, res, next) {
    try {
        const { otp, email, type } = req.body;

=======
import SetOtpValues from "../../utils/setOtpValues.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
import CheckIfAllRequiredFieldsArePresent from "../../utils/checkAllRequiredsField.js";

const arrayOfRequiredFields = ["otp", "email"];
async function VerifyOtp(req, res, next) {
    try {
        const { body: { otp, email, type } } = req;
        const errors = CheckIfAllRequiredFieldsArePresent(req.body, arrayOfRequiredFields); // returns an object with all the errors
        if (Object.keys(errors).length > 0) {
            throw new ApiError("Details Required", 400, `Please fill out the required fields : ${Object.keys(errors)}`, true);
        }
>>>>>>> Stashed changes
        const user = await Users.findOne({ email, otp /* ,otpType: OtpTypes.Signin */ });
        if (!user) {
            throw new ApiError("Invalid Details", 400, "User not found or generate a new otp", true);
        }

        const currentTime = new Date().getTime();
        if (user.otpExpiry < currentTime) {
<<<<<<< Updated upstream
          // await SetOtpValues(user, false);
            throw new ApiError("Invalid Details", 400, "OTP is expired!", true);
        }

        if (user.otp != otp) {
=======
            await SetOtpValues(user, false);
            throw new ApiError("Invalid Details", 400, "OTP is expired!", true);
        }

        if (user.otp !== otp) {
>>>>>>> Stashed changes
            throw new ApiError("Invalid Details", 400, "OTP is invalid!", true);
        }

        // if otp is valid and hasnt expired and type is signin then return the user and token
        if (type === "signin") {
<<<<<<< Updated upstream
            //await SetOtpValues(user, false);
=======
            await SetOtpValues(user, false);
>>>>>>> Stashed changes
            const sanitizedUser = SEND_SANITIZED_SUCCESS_RESPONSE(user);
            const token = signJwtToken(user._id);
            const finalResponse = { ...sanitizedUser, token };
            return sendSuccessResponse(res, 200, true, "Login succesfull", "login", finalResponse);
        }
        // means otp is valid and hasnt expired
        user.otpVerified = true;
        await user.save();
<<<<<<< Updated upstream
        const sanitizedUser = SEND_SANITIZED_SUCCESS_RESPONSE(user);
        const token = signJwtToken(user._id);
        const finalResponse = { ...sanitizedUser, token };
        return sendSuccessResponse(res, 200, true, "Otp Verified","verify Otp",finalResponse);
=======
        return sendSuccessResponse(res, 200, true, "Otp Verified");
>>>>>>> Stashed changes
    } catch (error) {
        next(error);
    }
}

export default VerifyOtp;
