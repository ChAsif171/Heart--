let empty;
if (typeof module != "undefined") {
  empty = require("../init/empty.js");
} else {
  empty = window.tempnpempty;
}

function sigma(inputs) {
  let sum = 0;
  for (let i = 0; i < inputs.length; i++) {
    sum += Math.exp(inputs[i]);
  }
  return sum;
}

function softmax(inputs) {
  let sum = sigma(inputs);
  let outputs = empty(inputs.length, inputs[0].length);
  for (let i = 0; i < outputs.length; i++) {
    for (let j = 0; j < outputs[i].length; j++) {
      outputs[i][j] = Math.exp(inputs[i][j]) / sum;
    }
  }
  return outputs;
}

if (typeof module != "undefined") {
  module.exports = softmax;
} else {
  window.np["softmax"] = softmax;
}
