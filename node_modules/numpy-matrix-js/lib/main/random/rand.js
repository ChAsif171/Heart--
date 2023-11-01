let empty;
if (typeof module != "undefined") {
  empty = require("../init/empty.js");
} else {
  empty = window.tempnpempty;
}
function rand(rows, cols) {
  let arr = empty(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      arr[i][j] = Math.random() * 2;
    }
  }
  return arr;
}
if (typeof module != "undefined") {
  module.exports = rand;
} else {
  window.np["random"] = {
    rand: rand,
  };
}
