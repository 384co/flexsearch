import { DEBUG, SUPPORT_ASYNC, SUPPORT_CACHE } from "./config";
import { searchCache } from "./cache";

function Engine(a) {

    if (DEBUG && this instanceof Engine) throw new Error("Can't instantiate abstract class!");

    SUPPORT_CACHE && (a.prototype.searchCache = searchCache), SUPPORT_ASYNC && (a.prototype.addAsync = addAsync, a.prototype.appendAsync = appendAsync, a.prototype.searchAsync = searchAsync, a.prototype.updateAsync = updateAsync, a.prototype.removeAsync = removeAsync);
}

SUPPORT_CACHE && (Engine.prototype.searchCache = searchCache), SUPPORT_ASYNC && (Engine.prototype.addAsync = addAsync, Engine.prototype.appendAsync = appendAsync, Engine.prototype.searchAsync = searchAsync, Engine.prototype.updateAsync = updateAsync, Engine.prototype.removeAsync = removeAsync);