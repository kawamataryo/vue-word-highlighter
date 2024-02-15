import { h } from "vue-demi";
import diacritics from "diacritics";
import { getRowWordList } from "./getRowWordList";

const escapeRegExp = (text: string) => {
  return text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

const createHighlightPattern = (options: {
  query: string | RegExp;
  splitBySpace: boolean;
  caseSensitive: boolean;
}): RegExp => {
  let pattern: string;

  if (options.query instanceof RegExp) {
    return new RegExp(
      String.raw`(${options.query.source})`,
      `g${options.caseSensitive ? "" : "i"}`,
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
    `g${options.caseSensitive ? "" : "i"}`,
  );
};

export const createHighlightWordChunk = (
  targetText: string,
  options: {
    query: string | RegExp;
    splitBySpace: boolean;
    caseSensitive: boolean;
    diacriticsSensitive: boolean;
    highlightTag: string;
    highlightClass: Record<string, boolean> | string | string[];
    highlightStyle: Record<string, boolean> | string | string[];
  },
  isHtml = false,
) => {
  if (
    !options.query ||
    (options.query instanceof String && !options.query.trim())
  ) {
    return targetText;
  }

  let innerTargetText = targetText;
  let innerQuery = options.query;
  let hasDiacritics = false;

  if (!options.diacriticsSensitive) {
    innerTargetText = diacritics.remove(innerTargetText);
    innerQuery =
      options.query instanceof RegExp
        ? new RegExp(diacritics.remove(options.query.source))
        : diacritics.remove(options.query);
    hasDiacritics = innerTargetText !== targetText;
  }

  const pattern = createHighlightPattern({
    query: innerQuery,
    splitBySpace: options.splitBySpace,
    caseSensitive: options.caseSensitive,
  });

  const wordList = innerTargetText.split(pattern);

  // Make a list restoring the original string because diacritics may have been converted
  const restoredWordList = hasDiacritics
    ? getRowWordList(targetText, wordList)
    : wordList;

  if (isHtml) {
    return wordList
      .map((w: string, i: number) => {
        if (pattern.test(w)) {
          // FIXME: highlightClass and highlightStyle are only supported as string
          const classLiteral = options.highlightClass
            ? ` class="${options.highlightClass}"`
            : "";
          const styleLiteral = options.highlightStyle
            ? ` style="${options.highlightStyle}"`
            : "";
          return `<${options.highlightTag}${classLiteral}${styleLiteral}>${restoredWordList[i]}</${options.highlightTag}>`;
        }
        return restoredWordList[i];
      })
      .join("");
  } else {
    return wordList.map((w: string, i: number) => {
      if (pattern.test(w)) {
        return h(
          options.highlightTag,
          {
            class: options.highlightClass,
            style: options.highlightStyle,
          },
          restoredWordList[i],
        );
      }
      return restoredWordList[i];
    });
  }
};
