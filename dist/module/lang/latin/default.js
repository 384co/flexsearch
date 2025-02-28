import { IndexInterface } from "../../type.js";
import { pipeline, normalize, regex_whitespace } from "../../lang.js";

export const rtl = !1;
export const tokenize = "";
export default {
    encode: encode,
    rtl: !1,
    tokenize: ""
};

export function encode(a) {

    return pipeline.call(this, ("" + a).toLowerCase(), !1, regex_whitespace, !1);
}