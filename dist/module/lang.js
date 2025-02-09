import { IndexInterface } from "./type.js";
import { create_object, get_keys } from "./common.js";

export function pipeline(a, b, c, d) {

    if (a && (b && (a = replace(a, b)), this.matcher && (a = replace(a, this.matcher)), this.stemmer && 1 < a.length && (a = replace(a, this.stemmer)), d && 1 < a.length && (a = collapse(a)), c || "" === c)) {

            const b = a.split(c);

            return this.filter ? filter(b, this.filter) : b;
        }

    return a;
}

export const regex_whitespace = /[\p{Z}\p{S}\p{P}\p{C}]+/u;
const regex_normalize = /[\u0300-\u036f]/g;

export function normalize(a) {

    return a.normalize && (a = a.normalize("NFD").replace(regex_normalize, "")), a;
}

export function init_filter(a) {

    const b = create_object();

    for (let c = 0, d = a.length; c < d; c++) b[a[c]] = 1;

    return b;
}

export function init_stemmer_or_matcher(a, b) {
    const c = get_keys(a),
          d = c.length,
          e = [];


    let f = "",
        g = 0;

    for (let h, j, k = 0; k < d; k++) h = c[k], j = a[h], j ? (e[g++] = regex(b ? "(?!\\b)" + h + "(\\b|_)" : h), e[g++] = j) : f += (f ? "|" : "") + h;

    return f && (e[g++] = regex(b ? "(?!\\b)(" + f + ")(\\b|_)" : "(" + f + ")"), e[g] = ""), e;
}

export function replace(a, b) {

    for (let c = 0, d = b.length; c < d && (a = a.replace(b[c], b[c + 1]), !!a); c += 2);

    return a;
}

export function regex(a) {

    return new RegExp(a, "g");
}

export function collapse(a) {

    let b = "",
        c = "";

    for (let d, e = 0, f = a.length; e < f; e++) (d = a[e]) !== c && (b += c = d);

    return b;
}

export function filter(a, b) {
    const c = a.length,
          d = [];


    for (let e = 0, f = 0; e < c; e++) {

        const c = a[e];

        c && !b[c] && (d[f++] = c);
    }

    return d;
}