let empty;
if (typeof module != "undefined") {
  empty = require("../init/empty.js");
} else {
  empty = window.tempnpempty;
}
function multiply(a, b) {
  if (a.cols != b.rows) {
    console.log("Columns must match rows");
    return undefined;
  }
  let result = empty(a.length, b[0].length);

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[i].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}
if (typeof module != "undefined") {
  module.exports = multiply;
} else {
  window.np["multiply"] = multiply;
}
