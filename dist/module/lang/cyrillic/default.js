import { IndexInterface } from "../../type.js";
import { pipeline } from "../../lang.js";

export const rtl = !1;
export const tokenize = "";
export default {
    encode: encode,
    rtl: !1
};

const regex = /[\x00-\x7F]+/g,
      split = /\s+/;


export function encode(a) {

    return pipeline.call(this, ("" + a).replace(regex, " "), !1, split, !1);
}