const {
  debug,
  init,
  random,
  m_math,
  s_math,
  functions,
} = require("../../lib/exports/export");

module.exports = {
  zeros: init.zeros,
  ones_like: init.ones_like,
  arange: init.arange,
  random: random,
  matmul: m_math.multiply,
  transpose: s_math.transpose,
  sigmoid: functions.sigmoid,
  dsigmoid: functions.dsigmoid,
  softmax: functions.softmax,
  tanh: functions.tanh,
  dtanh: functions.dtanh,
  relu: functions.relu,
  heaviside: functions.heaviside,
  leakyrelu: functions.leakyrelu,
  dleakyrelu: functions.dleakyrelu,
  subtract: m_math.subtract,
  add: m_math.add,
};
