import Users from "../models/users.js";
import { ApiError } from "../utils/ApiError.js";
import SetOtpValues from "../utils/setOtpValues.js";

const IsOtpVerified = async (req, res, next) => {
    let user;
    try {
        if (!req.user) {
            const { email } = req.body;
            if (!email) throw new ApiError("Invalid Details", 400, "Email is required!", true);
            user = await Users.findOne({ email: req.body.email });
        }

        const { otpVerified, otpExpiry } = user || req.user;
        if (!otpVerified) {
            throw new ApiError("Invalid Details", 400, "OTP is not verified!, Please verify otp first and note the otp will expire within 15 minutes.", true);
        }
        const currentTime = new Date().getTime();
        if (otpExpiry < currentTime) {
            await SetOtpValues(user, false);
            throw new ApiError("Invalid Details", 400, "OTP is expired!, Kindly generate new otp.", true);
        }
        // if otp is valid and hasnt expired then reset otpvalues
        await SetOtpValues(user, false);
        next();
    } catch (error) {
        next(error);
    }
};

export default IsOtpVerified;
