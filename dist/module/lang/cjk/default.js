import { IndexInterface } from "../../type.js";
import { pipeline } from "../../lang.js";

export const rtl = !1;
export const tokenize = "strict";
export default {
    encode: encode,
    rtl: !1,
    tokenize: "strict"
};

const regex = /[\x00-\x7F]+/g;

export function encode(a) {

    return pipeline.call(this, ("" + a).replace(regex, ""), !1, "", !1);
}