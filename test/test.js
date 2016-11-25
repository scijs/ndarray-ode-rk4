'use strict';

const ndarray = require('ndarray');
const rk4 = require('../index.js');
// const ops = require('ndarray-ops');
// const assert = require('chai').assert;

describe('Input Validation', function () {
  it('Test 1 -- Unit Circle', function () {
    let dt = Math.PI / 180;

    let options = {
      x0: ndarray(new Float64Array([1, 0]), [2, 1]),
      df: (function () {
        let r = 1;
        return function (t, y0, y) {
          let dx = -r * Math.sin(t);
          let dy = r * Math.cos(t);
          let z = y || ndarray(new Float64Array(2), [2, 1]);
          z.set(0, 0, dx);
          z.set(1, 0, dy);
          return z;
        };
      })(),
      dt: dt,
      t: 0,
      scratch: {
        k1: null,
        k2: null,
        k3: null,
        k4: null,
        x: null
      }
    };

    let i = 0;
    let x;
    for (i = 0; i < 360; ++i) {
      let output = rk4(options);
      x = output.x;
      let t = output.t;
      options.t = t;
      options.x0 = x;
      options.scratch.x = null;
    }
    console.log(x);
    // console.log(options);
  });
});
