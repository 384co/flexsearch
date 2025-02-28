

import { SUPPORT_ASYNC, SUPPORT_CACHE, SUPPORT_SERIALIZE, SUPPORT_STORE, SUPPORT_TAGS, SUPPORT_WORKER } from "./config.js";

import Index from "./index.js";
import { DocumentInterface } from "./type.js";
import Cache, { searchCache } from "./cache.js";
import { create_object, is_array, is_string, is_object, parse_option, get_keys } from "./common.js";
import apply_async from "./async.js";
import { intersect, intersect_union } from "./intersect.js";
import { exportDocument, importDocument } from "./serialize.js";
import WorkerIndex from "./worker/index.js";

function Document(a) {

    if (!(this instanceof Document)) return new Document(a);

    const b = a.document || a.doc || a;
    let c;

    this.tree = [], this.field = [], this.marker = [], this.register = create_object(), this.key = (c = b.key || b.id) && parse_tree(c, this.marker) || "id", this.fastupdate = parse_option(a.fastupdate, !0), SUPPORT_STORE && (this.storetree = (c = b.store) && !0 !== c && [], this.store = c && create_object()), SUPPORT_TAGS && (this.tag = (c = b.tag) && parse_tree(c, this.marker), this.tagindex = c && create_object()), SUPPORT_CACHE && (this.cache = (c = a.cache) && new Cache(c), a.cache = !1), SUPPORT_WORKER && (this.worker = a.worker), SUPPORT_ASYNC && (this.async = !1), this.index = parse_descriptor.call(this, a, b);
}

export default Document;

function parse_descriptor(a, b) {

    const c = create_object();
    let d = b.index || b.field || b;

    is_string(d) && (d = [d]);


    for (let e, f, g = 0; g < d.length; g++) e = d[g], is_string(e) || (f = e, e = e.field), f = is_object(f) ? Object.assign({}, a, f) : a, SUPPORT_WORKER && this.worker && (c[e] = new WorkerIndex(f), !c[e].worker && (this.worker = !1)), this.worker || (c[e] = new Index(f, this.register)), this.tree[g] = parse_tree(e, this.marker), this.field[g] = e;

    if (SUPPORT_STORE && this.storetree) {

        let a = b.store;

        is_string(a) && (a = [a]);


        for (let b = 0; b < a.length; b++) this.storetree[b] = parse_tree(a[b], this.marker);
    }

    return c;
}

function parse_tree(a, b) {

    const c = a.split(":");
    let d = 0;

    for (let e = 0; e < c.length; e++) a = c[e], 0 <= a.indexOf("[]") && (a = a.substring(0, a.length - 2), a && (b[d] = !0)), a && (c[d++] = a);

    return d < c.length && (c.length = d), 1 < d ? c : c[0];
}

function parse_simple(a, b) {

    if (is_string(b)) a = a[b];else for (let c = 0; a && c < b.length; c++) a = a[b[c]];

    return a;
}

function store_value(a, b, c, d, e) {

    if (a = a[e], d === c.length - 1) b[e] = a;else if (a) if (is_array(a)) {
            b = b[e] = Array(a.length);


            for (let e = 0; e < a.length; e++) store_value(a, b, c, d, e);
        } else b = b[e] || (b[e] = create_object()), e = c[++d], store_value(a, b, c, d, e);
}

function add_index(a, b, c, d, e, f, g, h) {
    if (a = a[g], a) if (d === b.length - 1) {

            if (is_array(a)) {

                if (c[d]) {

                    for (let b = 0; b < a.length; b++) e.add(f, a[b], !0, !0);

                    return;
                }

                a = a.join(" ");
            }

            e.add(f, a, h, !0);
        } else if (is_array(a)) for (let g = 0; g < a.length; g++) add_index(a, b, c, d, e, f, g, h);else g = b[++d], add_index(a, b, c, d, e, f, g, h);
}

Document.prototype.push_index = add_index, Document.prototype.add = function (a, b, c) {

    if (is_object(a) && (b = a, a = parse_simple(b, this.key)), b && (a || 0 === a)) {

        if (!c && this.register[a]) return this.update(a, b);

        for (let d, e, f = 0; f < this.field.length; f++) e = this.field[f], d = this.tree[f], is_string(d) && (d = [d]), add_index(b, d, this.marker, 0, this.index[e], a, d[0], c);

        if (SUPPORT_TAGS && this.tag) {
            let d = parse_simple(b, this.tag),
                e = create_object();
            is_string(d) && (d = [d]);


            for (let b, f, g = 0; g < d.length; g++) if (b = d[g], !e[b] && (e[b] = 1, f = this.tagindex[b] || (this.tagindex[b] = []), (!c || !f.includes(a)) && (f[f.length] = a, this.fastupdate))) {

                    const b = this.register[a] || (this.register[a] = []);
                    b[b.length] = f;
                }
        }

        if (SUPPORT_STORE && this.store && (!c || !this.store[a])) {

            let c;

            if (this.storetree) {
                c = create_object();


                for (let a, d = 0; d < this.storetree.length; d++) a = this.storetree[d], is_string(a) ? c[a] = b[a] : store_value(b, c, a, 0, a[0]);
            }

            this.store[a] = c || b;
        }
    }

    return this;
}, Document.prototype.append = function (a, b) {

    return this.add(a, b, !0);
}, Document.prototype.update = function (a, b) {

    return this.remove(a).add(a, b);
}, Document.prototype.remove = function (a) {

    if (is_object(a) && (a = parse_simple(a, this.key)), this.register[a]) {

        for (let b = 0; b < this.field.length && (this.index[this.field[b]].remove(a, !this.worker), !this.fastupdate); b++);

        if (SUPPORT_TAGS && this.tag && !this.fastupdate) for (let b in this.tagindex) {
                const c = this.tagindex[b],
                      d = c.indexOf(a);
                -1 !== d && (1 < c.length ? c.splice(d, 1) : delete this.tagindex[b]);
            }

        SUPPORT_STORE && this.store && delete this.store[a], delete this.register[a];
    }

    return this;
}, Document.prototype.search = function (a, b, c, d) {
    c || (!b && is_object(a) ? (c = a, a = "") : is_object(b) && (c = b, b = 0));
    let e,
        f,
        g,
        h,
        j,
        k,
        l = [],
        m = [],
        n = 0;


    if (c) if (is_array(c)) g = c, c = null;else {

            if (a = c.query || a, e = c.pluck, g = e || c.index || c.field, h = SUPPORT_TAGS && c.tag, f = SUPPORT_STORE && this.store && c.enrich, j = "and" === c.bool, b = c.limit || b || 100, k = c.offset || 0, h && (is_string(h) && (h = [h]), !a)) {

                    for (let a, c = 0; c < h.length; c++) a = get_tag.call(this, h[c], b, k, f), a && (l[l.length] = a, n++);

                    return n ? l : [];
                }

            is_string(g) && (g = [g]);
        }

    g || (g = this.field), j = j && (1 < g.length || h && 1 < h.length);


    const o = !d && (this.worker || this.async) && [];

    for (let e, f, p, q = 0; q < g.length; q++) {

        let i;

        if (f = g[q], is_string(f) || (i = f, f = i.field, a = i.query || a, b = i.limit || b), o) {
            o[q] = this.index[f].searchAsync(a, b, i || c);


            continue;
        } else e = d ? d[q] : this.index[f].search(a, b, i || c);

        if (p = e && e.length, h && p) {

            const a = [];
            let c = 0;

            j && (a[0] = [e]);


            for (let b, d, e = 0; e < h.length; e++) b = h[e], d = this.tagindex[b], p = d && d.length, p && (c++, a[a.length] = j ? [d] : d);

            c && (e = j ? intersect(a, b || 100, k || 0) : intersect_union(e, a), p = e.length);
        }

        if (p) m[n] = f, l[n++] = e;else if (j) return [];
    }

    if (o) {

        const d = this;

        return new Promise(function (e) {
            Promise.all(o).then(function (f) {
                e(d.search(a, b, c, f));
            });
        });
    }

    if (!n) return [];

    if (e && (!f || !this.store)) return l[0];

    for (let g, h = 0; h < m.length; h++) {

        if (g = l[h], g.length && f && (g = apply_enrich.call(this, g)), e) return g;

        l[h] = {

            field: m[h],
            result: g
        };
    }

    return l;
};


function get_tag(a, b, c, d) {
    let e = this.tagindex[a],
        f = e && e.length - c;


    if (f && 0 < f) return (f > b || c) && (e = e.slice(c, c + b)), d && (e = apply_enrich.call(this, e)), {

            tag: a,
            result: e
        };
}

function apply_enrich(a) {

    const b = Array(a.length);

    for (let c, d = 0; d < a.length; d++) c = a[d], b[d] = {

        id: c,
        doc: this.store[c]
    };

    return b;
}

Document.prototype.contain = function (a) {

    return !!this.register[a];
}, SUPPORT_STORE && (Document.prototype.get = function (a) {

    return this.store[a];
}, Document.prototype.set = function (a, b) {
    return this.store[a] = b, this;
}), SUPPORT_CACHE && (Document.prototype.searchCache = searchCache), SUPPORT_SERIALIZE && (Document.prototype.export = exportDocument, Document.prototype.import = importDocument), SUPPORT_ASYNC && apply_async(Document.prototype);