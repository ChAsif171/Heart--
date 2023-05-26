import brain from "brain.js";
import sendSuccessResponse from "../../../utils/sendSuccessResponse.js";
import fs from 'fs';
// import heart from "/heart";

const predection = async (req, res) => {
    console.log(req.body);
    const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = req.body;
    const network = new brain.NeuralNetworkGPU();

    network.train([
        {
            input: [34, 0, 1, 118, 210, 0, 1, 192, 0, 0.7, 2, 0, 2], output: [1]
        },
        {
            input: [51, 0, 2, 140, 308, 0, 0, 142, 0, 1.5, 2, 1, 2], output: [1]
        },
        {
            input: [54, 1, 0, 124, 266, 0, 0, 109, 1, 2.2, 1, 1, 3], output: [0]
        },
        {
            input: [52, 1, 0, 125, 212, 0, 1, 168, 0, 1, 2, 2, 3], output: [0]
        },
    ]);
    const output = network.run([age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal ]);
    console.log(output[0]);
    //await fs.readFile('./heart/heart.csv', 
    //function (err, data) {
    // console.log(err);
    // }
    // );
    // const file = await fs.readFile("/heart.csv",(err,data)=>{console.error(err);
    // // console.table(data);});
    // const parse = require('csv-parse');

    // var parser = parse({columns: true}, function (err, records) {
    // 	console.log(records);
    // });
    // fs.createReadStream("/heart.csv").pipe(parser);

    return sendSuccessResponse(res, 200, true, "test successfully", "NN test ", output);
}

export default predection;
