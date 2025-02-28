

import { IndexInterface, DocumentInterface } from "./type.js";
import { create_object, is_string } from "./common.js";

function async(a, b, c, d, e, f, g) {
    setTimeout(function () {

        const h = a(c ? c + "." + d : d, JSON.stringify(g));

        h && h.then ? h.then(function () {
            b.export(a, b, c, e, f + 1);
        }) : b.export(a, b, c, e, f + 1);
    });
}

export function exportIndex(a, b, c, d, e) {

    let f, g;

    switch (e || (e = 0)) {

        case 0:

            if (f = "reg", this.fastupdate) for (let a in g = create_object(), this.register) g[a] = 1;else g = this.register;

            break;

        case 1:
            f = "cfg", g = {
                doc: 0,
                opt: this.optimize ? 1 : 0
            };


            break;

        case 2:
            f = "map", g = this.map;

            break;

        case 3:
            f = "ctx", g = this.ctx;

            break;

        default:

            return;
    }

    return async(a, b || this, c, f, d, e, g), !0;
}

export function importIndex(a, b) {
    b && (is_string(b) && (b = JSON.parse(b)), "cfg" === a ? this.optimize = !!b.opt : "reg" === a ? (this.fastupdate = !1, this.register = b) : "map" === a ? 0 === Object.keys(this.map[0]).length ? this.map = b : (this.map.forEach((a, c) => {
        for (let d in this.map[c]) b[c].hasOwnProperty(d) && (this.map[c][d] = this.map[c][d].concat(b[c][d]));
    }), b.forEach((a, c) => {
        for (let d in b[c]) this.map[c].hasOwnProperty(d) || (this.map[c][d] = b[c][d]);
    })) : "ctx" === a ? this.ctx = b : void 0);
}

export function exportDocument(a, b, c, d, e) {

    if (e || (e = 0), d || (d = 0), d < this.field.length) {
        const c = this.field[d],
              f = this.index[c];
        b = this, setTimeout(function () {
            f.export(a, b, e ? c : "", d, e++) || (d++, e = 1, b.export(a, b, c, d, e));
        });
    } else {

        let b, f;

        switch (e) {

            case 1:
                b = "tag", f = this.tagindex;

                break;

            case 2:
                b = "store", f = this.store;

                break;

            default:

                return;
        }

        async(a, this, c, b, d, e, f);
    }
}

export function importDocument(a, b) {
    if (b) switch (is_string(b) && (b = JSON.parse(b)), a = a.replace(/(\w+\.)(store|tag)/, "$2"), a) {

            case "tag":
                if (!this.tagindex) this.tagindex = b;else {
                    const a = Object.keys(b)[0];
                    this.tagindex[a] = b[a];
                }

                break;

            case "reg":
                this.fastupdate = !1, this.register = b;


                for (let a, c = 0; c < this.field.length; c++) a = this.index[this.field[c]], a.register = b, a.fastupdate = !1;

                break;

            case "store":
                if (!this.store) this.store = b;else {
                    const a = Object.keys(b)[0];
                    this.store[a] = b[a];
                }
                break;

            default:
                a = a.split(".");

                const c = a[0];
                a = a[1], c && a && this.index[c].import(a, b);

        }
}