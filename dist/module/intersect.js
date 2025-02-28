import { create_object, concat } from "./common.js";

export function intersect(a, b, c, d) {

    const e = a.length;
    let f,
        g,
        h = [],
        i = 0;
    d && (d = []);


    for (let j = e - 1; 0 <= j; j--) {
        const k = a[j],
              l = k.length,
              m = create_object();


        let n = !f;

        for (let a = 0; a < l; a++) {
            const l = k[a],
                  o = l.length;


            if (o) for (let a, k, p = 0; p < o; p++) if (k = l[p], f) {

                    if (f[k]) {

                        if (!j) if (c) c--;else if (h[i++] = k, i === b) return h;

                        (j || d) && (m[k] = 1), n = !0;
                    }

                    if (d && (a = (g[k] || 0) + 1, g[k] = a, a < e)) {

                            const b = d[a - 2] || (d[a - 2] = []);
                            b[b.length] = k;
                        }
                } else m[k] = 1;
        }

        if (d) f || (g = m);else if (!n) return [];

        f = m;
    }

    if (d) for (let a, e, g = d.length - 1; 0 <= g; g--) {
            a = d[g], e = a.length;


            for (let d, g = 0; g < e; g++) if (d = a[g], !f[d]) {

                if (c) c--;else if (h[i++] = d, i === b) return h;

                f[d] = 1;
            }
        }

    return h;
}

export function intersect_union(a, b) {
    const c = create_object(),
          d = create_object(),
          e = [];


    for (let d = 0; d < a.length; d++) c[a[d]] = 1;

    for (let f, g = 0; g < b.length; g++) {
        f = b[g];


        for (let a, b = 0; b < f.length; b++) a = f[b], c[a] && !d[a] && (d[a] = 1, e[e.length] = a);
    }

    return e;
}