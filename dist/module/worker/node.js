const { parentPort } = require("worker_threads"),
      { Index } = require("../flexsearch.bundle.js");

let index;

parentPort.on("message", function (a) {
    const b = a.args,
          c = a.task,
          d = a.id;


    switch (c) {

        case "init":
            const e = a.options || {},
                  f = e.encode;
            e.cache = !1, f && 0 === f.indexOf("function") && (e.encode = new Function("return " + f)()), index = new Index(e);

            break;

        default:

            const g = index[c].apply(index, b);
            parentPort.postMessage("search" === c ? { id: d, msg: g } : { id: d });

    }
});