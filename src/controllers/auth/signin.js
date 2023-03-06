import Users from "../../models/users.js";
import { ApiError } from "../../utils/ApiError.js";
import print from "../../utils/print.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
import SEND_SANITIZED_SUCCESS_RESPONSE from "../../utils/sendSanitizedSuccessResponse.js";
async function SignIn(req, res, next) {
    try {
        const { email, password } = req.body;

        const userExists = await Users.findOne({ email: email.toLowerCase() });
        if (!userExists) throw new ApiError("Invalid Credentials", 400, "Incorrect Email or password", true);

        const userVerified = await userExists.bcryptComparePassword(password);
        if (!userVerified) {
            throw new ApiError("Invalid Cradentials", 400, "Incorrect email or Password", true);
        }
        const sanitizedUser = SEND_SANITIZED_SUCCESS_RESPONSE(userExists);
        return sendSuccessResponse(res, 200, true, "login successfully", "signinOtp", sanitizedUser);
    } catch (error) {
        print("warn", error.message);
        next(error);
    }
}

export default SignIn;