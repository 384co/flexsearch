import { IndexInterface, DocumentInterface } from "./type.js";

import { is_function, is_object, is_string } from "./common.js";

export default function (a) {
    register(a, "add"), register(a, "append"), register(a, "search"), register(a, "update"), register(a, "remove");
}

function register(a, b) {
    a[b + "Async"] = function () {
        const a = this,
              c = arguments,
              d = c[c.length - 1];

        let e;

        is_function(d) && (e = d, delete c[c.length - 1]);


        const f = new Promise(function (d) {
            setTimeout(function () {
                a.async = !0;

                const e = a[b].apply(a, c);
                a.async = !1, d(e);
            });
        });

        return e ? (f.then(e), this) : f;
    };
}