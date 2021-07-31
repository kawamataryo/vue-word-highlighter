const escapeRegExp = (text: string) => {
  return text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

export const createHighlightPattern = (options: {
  query: string;
  splitBySpace: boolean;
  caseSensitive: boolean;
  regex: boolean;
}): RegExp => {
  let pattern: string;
  const q = options.regex ? options.query : escapeRegExp(options.query);
  if (options.splitBySpace) {
    const normalizeQuery = q.trim().replace(/\s+/g, " ");
    pattern = `(${normalizeQuery.split(/\s/).join("|")})`;
  } else {
    pattern = `(${q})`;
  }

  return new RegExp(pattern, `g${options.caseSensitive ? "" : "i"}`);
};
