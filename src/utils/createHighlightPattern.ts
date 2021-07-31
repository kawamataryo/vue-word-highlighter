export const createHighlightPattern = (
  query: string,
  splitBySpace: boolean,
  caseSensitive: boolean
): RegExp => {
  let pattern: string;

  if (splitBySpace) {
    const normalizeQuery = query.trim().replace(/\s+/g, " ");
    pattern = `(${normalizeQuery.split(/\s/).join("|")})`;
  } else {
    pattern = `(${query})`;
  }

  return new RegExp(pattern, `g${caseSensitive ? "" : "i"}`);
};
