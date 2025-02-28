import { IndexInterface, DocumentInterface } from "./type.js";
import { create_object, is_object } from "./common.js";

function CacheClass(a) {
    this.limit = !0 !== a && a, this.cache = create_object(), this.queue = [];
}

export default CacheClass;

export function searchCache(a, b, c) {
    is_object(a) && (a = a.query);


    let d = this.cache.get(a);

    return d || (d = this.search(a, b, c), this.cache.set(a, d)), d;
}

CacheClass.prototype.set = function (a, b) {

    if (!this.cache[a]) {

        let b = this.queue.length;

        b === this.limit ? delete this.cache[this.queue[b - 1]] : b++;


        for (let a = b - 1; 0 < a; a--) this.queue[a] = this.queue[a - 1];

        this.queue[0] = a;
    }

    this.cache[a] = b;
}, CacheClass.prototype.get = function (a) {

    const b = this.cache[a];

    if (this.limit && b) {

        const b = this.queue.indexOf(a);

        if (b) {

            const a = this.queue[b - 1];
            this.queue[b - 1] = this.queue[b], this.queue[b] = a;
        }
    }

    return b;
}, CacheClass.prototype.del = function (a) {

    for (let b, c, d = 0; d < this.queue.length; d++) c = this.queue[d], b = this.cache[c], b.includes(a) && (this.queue.splice(d--, 1), delete this.cache[c]);
};