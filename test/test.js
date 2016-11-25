'use strict';

const ndarray = require('ndarray');
const rk4 = require('../index.js');
// const assert = require('chai').assert;

describe('Input Validation', function () {
  it('Test 1 -- Circle', function () {
    let dt = 0.01;
    let options = {
      x0: ndarray(new Float64Array([1, 0]), [2, 1]),
      df: (function () {
        let r = 1;
        return function (t, y0, y) {
          let dx = -r * Math.sin(t);
          let dy = r * Math.cos(t);
          return ndarray(new Float64Array([dx, dy]), [2, 1]);
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
    let x = rk4(options);
    console.log(x);
  });
});
