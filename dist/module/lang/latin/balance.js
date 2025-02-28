import { IndexInterface } from "../../type.js";
import { encode as encode_simple } from "./simple.js";

export const rtl = !1;
export const tokenize = "strict";
export default {
    encode: encode,
    rtl: !1,
    tokenize: "strict"
};

const regex_strip = /[^a-z0-9]+/,
      soundex = {

    b: "p",

    v: "f",
    w: "f",

    z: "s",
    x: "s",
    ß: "s",

    d: "t",

    n: "m",

    c: "k",
    g: "k",
    j: "k",

    q: "k",

    i: "e",
    y: "e",

    u: "o"
};


export function encode(a) {
    a = encode_simple.call(this, a).join(" ");


    const b = [];

    if (a) {
        const c = a.split(regex_strip),
              d = c.length;


        for (let e, f = 0, g = 0; f < d; f++) if ((a = c[f]) && (!this.filter || !this.filter[a])) {
            e = a[0];
            let c = soundex[e] || e,
                d = c;


            for (let b = 1; b < a.length; b++) {
                e = a[b];

                const f = soundex[e] || e;

                f && f !== d && (c += f, d = f);
            }

            b[g++] = c;
        }
    }

    return b;
}