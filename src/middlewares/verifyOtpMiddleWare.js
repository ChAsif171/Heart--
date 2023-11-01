import SetOtpValues from "../utils/setOtpValues.js";
import { ApiError } from "../utils/ApiError.js";
import CheckIfAllRequiredFieldsArePresent from "../utils/checkAllRequiredsField.js";

const arrayOfRequiredFields = ["otp", "email"];
async function VerifyOtpMiddleware(req, res, next) {
    try {
        const { user, body: { otp, email } } = req;
        const errors = CheckIfAllRequiredFieldsArePresent(req.body, arrayOfRequiredFields); // returns an object with all the errors
        if (Object.keys(errors).length > 0) {
            throw new ApiError("Details Required", 400, `Please fill out the required fields : ${Object.keys(errors)}`, true);
        }

        const currentTime = new Date().getTime();
        if (user.otpExpiry < currentTime) {
            await SetOtpValues(user, false);
            throw new ApiError("Invalid Details", 400, "OTP has been expired!", true);
        }

        if (user.otp !== otp) {
            throw new ApiError("Invalid Details", 400, "OTP is invalid!", true);
        }

        // means otp is valid and hasnt expired
        await SetOtpValues(user, false);
        next();
    } catch (error) {
        next(error);
    }
}

export default VerifyOtpMiddleware;
