import { POLYFILL, SUPPORT_ASYNC } from "./config.js";

export let promise = Promise;

if (POLYFILL && (Object.assign || (Object.assign = function () {
    const a = arguments,
          b = a.length,
          c = a[0];


    for (let d, e, f, g = 1; g < b; g++) {
        d = a[g], e = Object.keys(d), f = e.length;


        for (let a, b = 0; b < f; b++) a = e[b], c[a] = d[a];
    }

    return c;
}), SUPPORT_ASYNC && !promise)) {

        function a(a) {
            this.callback = null;


            const b = this;

            a(function (a) {
                b.callback && b.callback(a);
            });
        }

        a.prototype.then = function (a) {
            this.callback = a;
        }, promise = a;
    }