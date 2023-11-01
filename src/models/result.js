import mongoose from "mongoose"; 

const Schema=new mongoose.Schema({
    email:{
        type: String,
        trim: true,
    },
    age:{
        type:String,
        trim:true
    },
    sex:{
        type:String,
        trim:true
    },
    cp:{
        type:String,
        trim:true
    },
    trestbps:{
        type:String,
        trim:true
    },
    chol:{
        type:String,
        trim:true
    },
    fbs:{
        type:String,
        trim:true
    },
    restecg:{
        type:String,
        trim:true
    },
    thalach:{
        type:String,
        trim:true
    },
    exang:{
        type:String,
        trim:true
    },
    oldpeak:{
        type:String,
        trim:true
    },
    slope:{
        type:String,
        trim:true
    },
    ca:{
        type:String,
        trim:true
    },
    thal:{
        type:String,
        trim:true
    },
    results:{
        type:String,
    }
});
const result = mongoose.model("results", Schema);

export default result;