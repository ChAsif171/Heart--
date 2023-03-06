import jwt from "jsonwebtoken";
import ENV from "../config/keys.js";

function signJwtToken(userId, emailToken = false) {
    const payload = { userId };
    if (emailToken) {
        // add 10 mins to current time
        payload.tokenExpiryTime = new Date().getTime() + (10 * 60 * 1000);
    }
    return jwt.sign(payload, ENV.JWT.SECRET, {
        expiresIn: emailToken ? ENV.JWT.VERIFY_EMAIL_TOKEN_EXPIRY : ENV.JWT.TOKEN_EXPIRY,
    });
}
export default signJwtToken;
