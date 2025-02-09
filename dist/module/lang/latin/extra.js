import { IndexInterface } from "../../type.js";
import { regex, replace, collapse } from "../../lang.js";
import { encode as encode_advanced } from "./advanced.js";

export const rtl = !1;
export const tokenize = "";
export default {
    encode: encode,
    rtl: !1,
    tokenize: ""
};

const prefix = "(?!\\b)",
      regex_vowel = regex("(?!\\b)[aeo]"),
      pairs = [regex_vowel, ""];


export function encode(a) {

    return a && (a = encode_advanced.call(this, a, !0), 1 < a.length && (a = a.replace(regex_vowel, "")), 1 < a.length && (a = collapse(a)), a && (a = a.split(" "))), a || [];
}