import { SUPPORT_ASYNC, SUPPORT_DOCUMENT, SUPPORT_CACHE, SUPPORT_SERIALIZE, SUPPORT_WORKER, SUPPORT_ENCODER } from "./config.js";
import Document from "./document.js";
import Index from "./index.js";
import WorkerIndex from "./worker/index.js";
import { registerCharset, registerLanguage } from "./global.js";
import charset_default from "./lang/latin/default.js";
import charset_simple from "./lang/latin/simple.js";
import charset_balance from "./lang/latin/balance.js";
import charset_advanced from "./lang/latin/advanced.js";
import charset_extra from "./lang/latin/extra.js";

Document.prototype.add, Document.prototype.append, Document.prototype.search, Document.prototype.update, Document.prototype.remove, Document.prototype.contain, Document.prototype.get, Document.prototype.set, Document.prototype.push_index, Index.prototype.add, Index.prototype.append, Index.prototype.search, Index.prototype.update, Index.prototype.remove, Index.prototype.contain, SUPPORT_CACHE && (Index.prototype.searchCache, Document.prototype.searchCache), SUPPORT_ASYNC && (Document.prototype.addAsync, Document.prototype.appendAsync, Document.prototype.searchAsync, Document.prototype.updateAsync, Document.prototype.removeAsync, Index.prototype.addAsync, Index.prototype.appendAsync, Index.prototype.searchAsync, Index.prototype.updateAsync, Index.prototype.removeAsync), SUPPORT_SERIALIZE && (Index.prototype.export, Index.prototype.import, Document.prototype.export, Document.prototype.import), SUPPORT_ENCODER && (registerCharset("latin:default", charset_default), registerCharset("latin:simple", charset_simple), registerCharset("latin:balance", charset_balance), registerCharset("latin:advanced", charset_advanced), registerCharset("latin:extra", charset_extra));


const root = self;
let tmp;

const FlexSearch = {

    Index: Index,
    Document: SUPPORT_DOCUMENT ? Document : null,
    Worker: SUPPORT_WORKER ? WorkerIndex : null,
    registerCharset: registerCharset,
    registerLanguage: registerLanguage
};

(tmp = root.define) && tmp.amd ? tmp([], function () {

    return FlexSearch;
}) : root.exports ? root.exports = FlexSearch : root.FlexSearch = FlexSearch;