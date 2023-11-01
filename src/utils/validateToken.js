import jwt from "jsonwebtoken";
import ENV from "../config/keys.js";

function validateToken(token) {
    if (!token) {
        return {
            token: false,
            message: "Access denied. No token provided.",
        };
    }

    const bearer = token.split(" ");

    const [, bearerToken] = bearer;

    const decoded = jwt.verify(bearerToken, ENV.JWT.SECRET);
    if (!decoded.userId) {
        return {
            token: false,
            message: "Access denied. Token is malformed",
        };
    }
    return {
        token: true,
        user: decoded.userId,
    };
}

export default validateToken;
