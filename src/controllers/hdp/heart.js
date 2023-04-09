import hearts from "../../models/hearts.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
import print from "../../utils/print.js";

const heart = async (req, res,next) => {
    try {
        let newUser;
        const { user } = req;
        const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = req.body;

        const result = await hearts.findOne({ email: user.email });
        if (result) {
            console.log(result);
        }
        else {
            const apiBody = {
                email: user.email,
                age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal,
            }
            newUser= new hearts(apiBody);
            await newUser.save();

        }
        return sendSuccessResponse(res, 200, true, "userdata save", "heart Api", newUser);

    } catch (error) {
        print("error in heart", error);
        next(error);

    }
}

export default heart;
