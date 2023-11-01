function tanh(x) {
  return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}

if (typeof module != "undefined") {
  module.exports = tanh;
} else {
  window.np["tanh"] = tanh;
}
