function hasNaN(matrix) {
  if (matrix.constructor != Array) return;
  if (matrix[0].constructor == Array) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (isNaN(matrix[i][j])) {
          console.log(true);
        }
      }
    }
    console.log(false);
  } else {
    for (let i = 0; i < matrix.length; i++) {
      if (isNaN(matrix[i])) {
        console.log(true);
      }
    }
    console.log(false);
  }
}

if (typeof module != "undefined") {
  module.exports = hasNaN;
} else {
  window.tempnphasnan = hasNaN;
}
