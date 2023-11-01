function heaviside(n) {
  return +(n >= 0);
}

if (typeof module != "undefined") {
  module.exports = heaviside;
} else {
  window.np["heaviside"] = heaviside;
}
