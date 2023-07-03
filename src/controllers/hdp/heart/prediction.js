import brain from "brain.js";
import sendSuccessResponse from "../../../utils/sendSuccessResponse.js";
import fs from 'fs';
import parse from "csv-parser";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const predection = async (req, res) => {
  var filePath = path.join(__dirname, '/heart.csv');
  const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, type } = req.body;

  console.log(req.body);
  // // const data = fs.readFileSync(filePath, 'utf8');
  // // const parsedData = csv.parse(data);
  // // for (const row of parsedData) {
  // //   console.log(row);
  // // }
  // // console.log(__dirname)
  // let x = [];
  // const network = new brain.NeuralNetworkGPU();
  var i=0;
  var csvData = [];
  var inputData = [];
  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ':' }))
    .on("data", function (csvrow) {
      csvData.push(csvrow.target);
      console.log('{ input:[ '+csvrow.age +','+csvrow.sex +','+csvrow.cp+','+ csvrow.trestbps +','+csvrow.chol +','+csvrow.fbs +','+csvrow.restecg +','+csvrow.thalach +','+csvrow.exang+','+ csvrow.oldpeak +','+ csvrow.slope +','+ csvrow.ca +','+ csvrow.thal+'], output :['+ csvrow.target +'] },');
      // console.log(i );
      // i++;
      inputData.push(csvrow.age);
    })
    .on('end', function () {

      // network.train([{ input:inputData, output: csvData }]);
      // const output1 = network.run([age]);
      console.log("result");

      //  console.log(csvData);
    });
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

  return sendSuccessResponse(res, 200, true, "test successfully", "NN test ");
}

export default predection;
