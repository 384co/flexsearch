import Index from "../index.js";

export default function (a) {
    a = a.data;
    const b = self._index,
          c = a.args,
          d = a.task;


    switch (d) {

        case "init":
            const e = a.options || {},
                  f = a.factory,
                  g = e.encode;
            e.cache = !1, g && 0 === g.indexOf("function") && (e.encode = Function("return " + g)()), f ? (Function("return " + f)()(self), self._index = new self.FlexSearch.Index(e), delete self.FlexSearch) : self._index = new Index(e);


            break;

        default:
            const h = a.id,
                  i = b[d].apply(b, c);
            postMessage("search" === d ? { id: h, msg: i } : { id: h });

    }
}