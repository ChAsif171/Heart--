let empty;
if (typeof module != "undefined") {
  empty = require("../init/empty.js");
} else {
  empty = window.tempnpempty;
}
function transpose(matrix) {
  if (matrix[0].constructor == Array) {
    let result = empty(matrix[0].length, matrix.length);

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        result[j][i] = matrix[i][j];
      }
    }
    return result;
  } else {
    console.log("\x1b[31m%s\x1b[0m", "ERROR: Cannot transpose 1D array");
  }
}

if (typeof module != "undefined") {
  module.exports = transpose;
} else {
  window.np["transpose"] = transpose;
}
