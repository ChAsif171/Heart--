function dleakyrelu(x) {
  return x >= 0 ? 1 : 0.01;
}

if (typeof module != "undefined") {
  module.exports = dleakyrelu;
} else {
  window.np["dleakyrelu"] = dleakyrelu;
}
