export const global_lang = {};
export const global_charset = {};

export function registerCharset(a, b) {
  global_charset[a] = b;
}

export function registerLanguage(a, b) {
  global_lang[a] = b;
}