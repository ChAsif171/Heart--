function empty(rows, cols) {
  let matrix = new Array(rows);
  for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(cols);
  }
  return matrix;
}
if (typeof module != "undefined") {
  module.exports = empty;
} else {
  window.tempnpempty = empty;
}
