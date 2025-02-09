import { DEBUG } from "./config.js";
import { is_string } from "./common.js";

const preset = {

    memory: {
        charset: "latin:extra",

        resolution: 3,

        minlength: 4,
        fastupdate: !1
    },

    performance: {
        resolution: 3,
        minlength: 3,

        optimize: !1,

        context: {
            depth: 2,
            resolution: 1
        }
    },

    match: {
        charset: "latin:extra",
        tokenize: "reverse"
    },

    score: {
        charset: "latin:advanced",

        resolution: 20,
        minlength: 3,
        context: {
            depth: 3,
            resolution: 9
        }
    },

    default: {}

};

export default function apply_preset(a) {

    if (is_string(a)) DEBUG && !preset[a] && console.warn("Preset not found: " + a), a = preset[a];else {

        const b = a.preset;

        b && (DEBUG && !b[b] && console.warn("Preset not found: " + b), a = Object.assign({}, b[b], a));
    }

    return a;
}