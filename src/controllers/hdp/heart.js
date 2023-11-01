import hearts from "../../models/hearts.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
import print from "../../utils/print.js";
import predict from "../../utils/predict.js";
import result from "../../models/result.js";

const heart = async (req, res, next) => {
    try {
        let newUser;
        const user = { email: "chasiflyh@gmail.com" };
        console.log(user);
        var { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = req.body;
        const apiBody = {
            email: user.email,
            age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal
        };
        console.log(apiBody);
        const result1 = await hearts.findOne({ email: user.email });
        if (result1) {
            await hearts.updateMany({ email: user.email }, apiBody);
            newUser = apiBody;
        }
        else {
            newUser = new hearts(apiBody);
            await newUser.save();
        }
        age = req.body.age || 30;
        sex = req.body.sex || 0;
        cp = req.body.cp || 1;
        trestbps = req.body.trestbps || 120;
        chol = req.body.chol || 200;
        fbs = req.body.fbs || 0;
        restecg = req.body.restecg || 0;
        thalach = req.body.thalach || 140;
        exang = req.body.exang || 0;
        oldpeak = req.body.oldpeak || 0.7;
        slope = req.body.slope || 1;
        ca = req.body.ca || 0;
        thal = req.body.thal || 1;

        // age = 50;
        // sex = 1;
        // cp = 4;
        // trestbps = 280;
        // chol = 200;
        // fbs = 0;
        // restecg = 3;
        // thalach = 180;
        // exang = 3;
        // oldpeak = 0.7;
        // slope = 2;
        // ca = 2;
        // thal = 1;

        const pre_pocessing = { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal };

        const results = await predict(pre_pocessing);
        console.log(results);
        const apiResult = {
            email: user.email, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal,results
        };
        newUser = new result(apiResult);
        await newUser.save();

        return sendSuccessResponse(res, 200, true, " Update User Records", "Heart API", apiResult);
    } catch (error) {
        print("error in heart", error);
        next(error);

    }
}

export default heart;
