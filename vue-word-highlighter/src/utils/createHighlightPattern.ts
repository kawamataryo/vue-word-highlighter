const escapeRegExp = (text: string) => {
  return text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

export const createHighlightPattern = (options: {
  query: string | RegExp;
  splitBySpace: boolean;
  caseSensitive: boolean;
}): RegExp => {
  let pattern: string;

  if (options.query instanceof RegExp) {
    return new RegExp(
      String.raw`(${options.query.source})`,
      `g${options.caseSensitive ? "" : "i"}`
    );
  }

  if (options.splitBySpace) {
    const normalizeQuery = options.query.trim().replace(/\s+/g, " ");
    pattern = String.raw`(${normalizeQuery
      .split(/\s/)
      .map(escapeRegExp)
      .join("|")})`;
  } else {
    pattern = String.raw`(${escapeRegExp(options.query)})`;
  }

  return new RegExp(
    String.raw`${pattern}`,
    `g${options.caseSensitive ? "" : "i"}`
  );
};
