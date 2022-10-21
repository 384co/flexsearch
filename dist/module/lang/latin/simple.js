import { IndexInterface } from "../../type.js";
import { pipeline, normalize, regex_whitespace, regex } from "../../lang.js";

export const rtl = !1;
export const tokenize = "";
export default {
    encode: encode,
    rtl: !1,
    tokenize: ""
};

const regex_a = regex("[àáâãäå]"),
      regex_e = regex("[èéêë]"),
      regex_i = regex("[ìíîï]"),
      regex_o = regex("[òóôõöő]"),
      regex_u = regex("[ùúûüű]"),
      regex_y = regex("[ýŷÿ]"),
      regex_n = regex("ñ"),
      regex_c = regex("[çc]"),
      regex_s = regex("ß"),
      regex_and = regex(" & "),
      pairs = [regex_a, "a", regex_e, "e", regex_i, "i", regex_o, "o", regex_u, "u", regex_y, "y", regex_n, "n", regex_c, "k", regex_s, "s", regex_and, " and "];


export function encode(a) {

    return a = "" + a, pipeline.call(this, normalize(a).toLowerCase(), !a.normalize && pairs, regex_whitespace, !1);
}