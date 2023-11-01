function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

if (typeof module != "undefined") {
  module.exports = sigmoid;
} else {
  window.np = {
    sigmoid: sigmoid,
  };
}
