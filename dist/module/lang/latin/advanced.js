import { IndexInterface } from "../../type.js";
import { regex, replace, collapse } from "../../lang.js";
import { encode as encode_balance } from "./balance.js";

export const rtl = !1;
export const tokenize = "";
export default {
    encode: encode,
    rtl: !1,
    tokenize: ""
};

const regex_ae = regex("ae"),
      regex_oe = regex("oe"),
      regex_sh = regex("sh"),
      regex_th = regex("th"),
      regex_ph = regex("ph"),
      regex_pf = regex("pf"),
      pairs = [regex_ae, "a", regex_oe, "o", regex_sh, "s", regex_th, "t", regex_ph, "f", regex_pf, "f", regex("(?![aeo])h(?![aeo])"), "", regex("(?!^[aeo])h(?!^[aeo])"), ""];


export function encode(a, b) {

    return a && (a = encode_balance.call(this, a).join(" "), 2 < a.length && (a = replace(a, pairs)), !b && (1 < a.length && (a = collapse(a)), a && (a = a.split(" ")))), a || [];
}