'use strict';

const ndarray = require('ndarray');
const ops = require('ndarray-ops');

module.exports = function rk4 (options) {
  // TODO: do input validation check
  let x0 = options.x0;
  let df = options.df;
  let dt = options.dt;
  let t = options.t;

  // algorithm start
  let n = x0.shape[0];
  let k1;
  let k2;
  let k3;
  let k4;
  let x;
  if (options.scratch) {
    k1 = options.scratch.k1 || ndarray(new Float64Array(n), [n, 1]);
    k2 = options.scratch.k2 || ndarray(new Float64Array(n), [n, 1]);
    k3 = options.scratch.k3 || ndarray(new Float64Array(n), [n, 1]);
    k4 = options.scratch.k4 || ndarray(new Float64Array(n), [n, 1]);
    x = options.scratch.x || ndarray(new Float64Array(n), [n, 1]);
  } else {
    k1 = ndarray(new Float64Array(n), [n, 1]);
    k2 = ndarray(new Float64Array(n), [n, 1]);
    k3 = ndarray(new Float64Array(n), [n, 1]);
    k4 = ndarray(new Float64Array(n), [n, 1]);
    x = ndarray(new Float64Array(n), [n, 1]);
  }

  // compute k values
  df(t, x0, k1);
  ops.assign(k2, k1);
  ops.mulseq(k2, dt / 0.5);
  ops.addeq(k2, x0);
  df(t + dt / 2, k2, k2);
  ops.assign(k3, k2);
  ops.mulseq(k3, dt / 0.5);
  ops.addeq(k3, x0);
  df(t + dt / 2, k3, k3);
  ops.assign(k4, k3);
  ops.mulseq(k4, dt);
  ops.addeq(k4, x0);
  df(t + dt, k4, k4);

  // compute x
  ops.assign(x, k2);
  ops.addeq(x, k3);
  ops.mulseq(x, 2);
  ops.addeq(x, k1);
  ops.addeq(x, k4);
  ops.mulseq(x, dt / 6);

  if (!options.scratch) {
    options.scratch = {};
  }

  options.scratch.k1 = k1;
  options.scratch.k2 = k2;
  options.scratch.k3 = k3;
  options.scratch.k4 = k4;
  options.scratch.x = x;

  return x;
};
