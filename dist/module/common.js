export function parse_option(a, b) {

    return "undefined" == typeof a ? b : a;
}

export function create_object_array(a) {

    const b = Array(a);

    for (let c = 0; c < a; c++) b[c] = create_object();

    return b;
}

export function create_arrays(a) {

    const b = Array(a);

    for (let c = 0; c < a; c++) b[c] = [];

    return b;
}

export function get_keys(a) {

    return Object.keys(a);
}

export function create_object() {

    return Object.create(null);
}

export function concat(a) {

    return [].concat.apply([], a);
}

export function sort_by_length_down(c, a) {

    return a.length - c.length;
}

export function is_array(a) {

    return a.constructor === Array;
}

export function is_string(a) {

    return "string" == typeof a;
}

export function is_object(a) {

    return "object" == typeof a;
}

export function is_function(a) {

    return "function" == typeof a;
}