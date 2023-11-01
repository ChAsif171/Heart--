function table(matrix) {
  console.table(matrix);
}
if (typeof module != "undefined") {
  module.exports = table;
} else {
  window.tempnptable = table;
}
