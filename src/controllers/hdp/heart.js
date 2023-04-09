import hearts from "../../models/hearts.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
import print from "../../utils/print.js";

const heart = async (req, res,next) => {
    try {
        const { user } = req;
        const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = req.body;

        const result = await hearts.findOne({ email: user.email });
        if (result) {
            console.log(result);
        }
        else {
            const abiBody = {
                email: user.email,
                age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal,
            }

        }
        return sendSuccessResponse(res, 200, true, "userdata save", "heart Api", req.body);

    } catch (error) {
        print("error in heart", error);
        next(error);

    }
}

export default heart;
