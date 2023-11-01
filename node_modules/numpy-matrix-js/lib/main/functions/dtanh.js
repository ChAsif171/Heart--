function dtanh(y) {
  return 1 - y * y;
}

if (typeof module != "undefined") {
  module.exports = dtanh;
} else {
  window.np["dtanh"] = dtanh;
}
