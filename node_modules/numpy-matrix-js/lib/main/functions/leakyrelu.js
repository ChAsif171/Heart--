function leakyrelu(x) {
  return x >= 0 ? x : 0.01 * x;
}

if (typeof module != "undefined") {
  module.exports = leakyrelu;
} else {
  window.np["leakyrelu"] = leakyrelu;
}
