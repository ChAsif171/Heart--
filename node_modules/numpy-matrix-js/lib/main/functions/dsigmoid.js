function dsigmoid(y) {
  return y * (1 - y);
}

if (typeof module != "undefined") {
  module.exports = dsigmoid;
} else {
  window.np["dsigmoid"] = dsigmoid;
}
