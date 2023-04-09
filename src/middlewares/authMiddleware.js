/* eslint-disable require-atomic-updates */
import { ApiError } from "../utils/ApiError.js";
import print from "../utils/print.js";
import validateToken from "../utils/validateToken.js";

const authMiddleware = (model) => {
    const authHandler = async (req, res, next) => {
        // get bearer token from header
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError("Access denied.", 401, "Access denied. No token provided.");
            }

            const getToken = validateToken(token);
            if (!getToken.token && getToken?.message) {
                throw new ApiError("Access denied.", 401, getToken.message);
            }

            let user = null;
            if (getToken.token) {
                user = await model.findOne({ _id: getToken.user });
                if (!user) throw new ApiError("Access denied.", 401, "Access denied. Unauthorized, user not found with the provided token", true);
            }

            // check if user is blocked
            if (user?.isBlocked ?? false) throw new ApiError("Access denied.", 401, "Access denied. Your account has been blocked. Please contact support for more information.", true);

            req.user = user;
            console.log(user);
            next();
        } catch (error) {
            next(error);
        }
    };
    return authHandler;
};

export default authMiddleware;
