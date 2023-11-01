let empty = window.tempnpempty;
let info = window.tempnpinfo;
let table = window.tempnptable;
let hasNaN = window.tempnphasnan;

Object.defineProperty(Array.prototype, "randomize", {
  value: function (range1 = 0, range2 = 1) {
    for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < this[i].length; j++) {
        this[i][j] = Math.random() * (range2 - range1) + range1;
      }
    }
  },
});

Object.defineProperty(Array.prototype, "reshape", {
  value: function reshape(rows, cols) {
    if (this[0].constructor == Array) {
      let size = this.length * this[0].length;
      if (size % rows == 0 && size % cols == 0 && size / rows == cols) {
        let oned = empty(size, 1);
        let counter = 0;
        for (let i = 0; i < this.length; i++) {
          for (let j = 0; j < this[0].length; j++) {
            oned[counter] = this[i][j];
            counter++;
          }
        }
        let result = empty(rows, cols);
        counter = 0;
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            result[i][j] = oned[counter];
            counter++;
          }
        }
        return result;
      }
    } else {
      console.log("\x1b[31m%s\x1b[0m", "ERROR: Cannot reshape 1D array");
    }
  },
});

Object.defineProperty(Array.prototype, "map", {
  value: function (func) {
    if (this[0].constructor == Array) {
      for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < this[i].length; j++) {
          let val = this[i][j];
          this[i][j] = func(val);
        }
      }
    } else if (this.constructor == Array && this[0].constructor == Number) {
      for (let i = 0; i < this.length; i++) {
        let val = this[i];
        this[i] = func(val);
      }
    } else {
      console.log("\x1b[31m%s\x1b[0m", "ERROR: Did not receive 1D or 2D array");
    }
  },
});

Object.defineProperty(Array.prototype, "multiply", {
  value: function (m2) {
    if (m2.constructor == Number) {
      for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < this[i].length; j++) {
          this[i][j] *= m2;
        }
      }
    } else {
      for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < this[i].length; j++) {
          this[i][j] *= m2[i][j];
        }
      }
    }
  },
});

function getShape(mat) {
  return [mat.length, mat[0].length];
}

Object.defineProperty(Array.prototype, "shape", {
  get() {
    return getShape(this);
  },
});

Object.defineProperty(Array.prototype, "info", {
  value: function () {
    info(this);
  },
});

Object.defineProperty(Array.prototype, "table", {
  value: function () {
    table(this);
  },
});

Object.defineProperty(Array.prototype, "hasNaN", {
  value: function () {
    hasNaN(this);
  },
});
