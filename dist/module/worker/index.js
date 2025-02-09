
import { create_object, is_function, is_object, is_string } from "../common.js";
import handler from "./handler.js";

let pid = 0;

function WorkerIndex(a) {

    if (!(this instanceof WorkerIndex)) return new WorkerIndex(a);

    let b;

    a ? is_function(b = a.encode) && (a.encode = b.toString()) : a = {};


    let c = (self || window)._factory;

    c && (c = c.toString());
    const d = "undefined" == typeof window && self.exports,
          e = this;
    this.worker = create(c, d, a.worker), this.resolver = create_object();
    this.worker && (d ? this.worker.on("message", function (a) {
        e.resolver[a.id](a.msg), delete e.resolver[a.id];
    }) : this.worker.onmessage = function (a) {
        a = a.data, e.resolver[a.id](a.msg), delete e.resolver[a.id];
    }, this.worker.postMessage({

        task: "init",
        factory: c,
        options: a
    }));
}

export default WorkerIndex;

register("add"), register("append"), register("search"), register("update"), register("remove");


function register(a) {
    WorkerIndex.prototype[a] = WorkerIndex.prototype[a + "Async"] = function () {
        const b = this,
              c = [].slice.call(arguments),
              d = c[c.length - 1];

        let e;

        is_function(d) && (e = d, c.splice(c.length - 1, 1));


        const f = new Promise(function (d) {
            setTimeout(function () {
                b.resolver[++pid] = d, b.worker.postMessage({

                    task: a,
                    id: pid,
                    args: c
                });
            });
        });

        return e ? (f.then(e), this) : f;
    };
}

function create(factory, is_node_js, worker_path) {

    let worker;

    try {
        worker = is_node_js ? eval('new (require("worker_threads")["Worker"])("../dist/node/node.js")') : factory ? new Worker(URL.createObjectURL(new Blob(["onmessage=" + handler.toString()], { type: "text/javascript" }))) : new Worker(is_string(worker_path) ? worker_path : "worker/worker.js", { type: "module" });
    } catch (a) {}

    return worker;
}