let empty;
if (typeof module != "undefined") {
  empty = require("../init/empty.js");
} else {
  empty = window.tempnpempty;
}
function add(mA, mB) {
  let result = empty(mA.length, mA[0].length);

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      result[i][j] = mA[i][j] + mB[i][j];
    }
  }
  return result;
}

if (typeof module != "undefined") {
  module.exports = add;
} else {
  window.np["add"] = add;
}
