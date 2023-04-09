import hearts from "../../models/hearts.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
import print from "../../utils/print.js";

const heart=(req,res)=>{
    try{
     const { user } = req;

     return sendSuccessResponse(res, 200, true, "userdata save","heart Api",req.body);

    }catch(error){
        print("error in heart",error.message);
       // next(error);

    }
}

export default heart;
