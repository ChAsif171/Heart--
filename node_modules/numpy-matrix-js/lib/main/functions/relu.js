function relu(x) {
  return Math.max(0, x);
}

if (typeof module != "undefined") {
  module.exports = relu;
} else {
  window.np["relu"] = relu;
}
