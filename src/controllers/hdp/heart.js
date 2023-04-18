import hearts from "../../models/hearts.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
import print from "../../utils/print.js";
import nn from "neural-network-node";

const ds= require("node-dataset.js");

const heart = async (req, res,next) => {
    try {
        let newUser;
        const { user } = req;
        const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = req.body;
        const apiBody={
            email:user.email,
            age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal
        };
const heartDataSet=await new ds.DataSet().fromFile("./heart.csv","csv");

        const result = await hearts.findOne({ email: user.email });
        if (result) {
            await hearts.updateMany({email:user.email},apiBody);
            newUser=apiBody; 
        }
        else {
            
            newUser= new hearts(apiBody);
            await newUser.save();

        }
        // return sendSuccessResponse(res, 200, true, " Update User Records", "Heart API", newUser);
        
        return sendSuccessResponse(res, 200, true, " Update User Records", "Heart API", heartDataSet);



    } catch (error) {
        print("error in heart", error);
        next(error);

    }
}

export default heart;
