function info(matrix) {
  if (matrix[0].constructor == Array) {
    console.log(matrix.length + " x " + matrix[0].length);
  } else {
    console.log(matrix.length);
  }
}
if (typeof module != "undefined") {
  module.exports = info;
} else {
  window.tempnpinfo = info;
}
