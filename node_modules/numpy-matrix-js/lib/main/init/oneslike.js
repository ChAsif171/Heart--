let empty;
if (typeof module != "undefined") {
  empty = require("../init/empty.js");
} else {
  empty = window.tempnpempty;
}

function ones_like(matrix) {
  if (matrix.constructor == Array) {
    if (matrix[0].constructor == Array) {
      let result = empty(matrix.length, matrix[0].length);
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          result[i][j] = 1;
        }
      }
      return result;
    } else {
      let result = new Array(matrix.length);
      for (let i = 0; i < matrix.length; i++) {
        result[i] = 1;
      }
      return result;
    }
  }
}

if (typeof module != "undefined") {
  module.exports = ones_like;
} else {
  window.np["ones_like"] = ones_like;
}
