import Users from "../../models/users.js";
import { ApiError } from "../../utils/ApiError.js";
import passwordValidation from "../../utils/passwordValidation.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
//import SetOtpValues from "../../utils/setOtpValues.js";
import SEND_SANITIZED_SUCCESS_RESPONSE from "../../utils/sendSanitizedSuccessResponse.js";

async function ResetPassword(req, res, next) {
    try {
        const { body: { password, confirmPassword, email } } = req;
        const Query = {
            otpVerified: true, // means wether user has used the verify token api or not
            email,
        };

        // password validation
        if (passwordValidation.match(password, confirmPassword) !== true) throw new ApiError("Invalid Details", 400, `${passwordValidation.match(password, confirmPassword).error}`, true);
        if (passwordValidation.length(password) !== true) throw new ApiError("Invalid Details", 400, `${passwordValidation.length(password).error}`, true);
        if (passwordValidation.strength(password) !== true) throw new ApiError("Invalid Details", 400, `${passwordValidation.strength(password).error}`, true);

        const user = await Users.findOne(Query).select("_id email phoneNumber firstName lastName dateOfBirth");
        if (!user) {
            throw new ApiError("Invalid Credentials", 400, `User not found.`, true);
        }
        

        user.password = password;
        await user.save();
        //await SetOtpValues(user, false);
        const sanitizedUser = SEND_SANITIZED_SUCCESS_RESPONSE(user);
        return sendSuccessResponse(res, 200, true, "Password reset successfully","reset Password",sanitizedUser);
    } catch (error) {
        next(error);
    }
}
export default ResetPassword;
