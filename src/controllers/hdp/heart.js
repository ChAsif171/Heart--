import hearts from "../../models/hearts.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
import print from "../../utils/print.js";
const heart = async (req, res,next) => {
    try {
        let newUser;
        const { user } = req;
        var { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = req.body;
        const apiBody={
            email:user.email,
            age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal
        };
        const result = await hearts.findOne({ email: user.email });
        if (result) {
            await hearts.updateMany({email:user.email},apiBody);
            newUser=apiBody; 
        }
        else {
            newUser= new hearts(apiBody);
            await newUser.save();
        }
        age= req.body.age||'30';
        sex=req.body.sex||'0';
        cp=req.body.cp||'1';
        trestbps=req.body.trestbps||'120';
        chol=req.body.chol||'200';
        fbs=req.body.fbs||'0';
        restecg=req.body.restecg||'0';
        thalach=req.body.thalach||'140';
        exang=req.body.exang||'0';
        oldpeak=req.body.oldpeak||'0.7';
        slope=req.body.slope||'1';
        ca=req.body.ca||'0';
        thal=req.body.thal||'1';
        const pre_pocessing = { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal };


        return sendSuccessResponse(res, 200, true, " Update User Records", "Heart API", pre_pocessing);
    } catch (error) {
        print("error in heart", error);
        next(error);

    }
}

export default heart;
