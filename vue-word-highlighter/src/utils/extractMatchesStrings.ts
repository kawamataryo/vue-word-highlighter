import { isVue3 } from "vue-demi";

export const extractMatchesStrings = (
  wordChunk: string | (string | unknown)[],
): string[] => {
  if (typeof wordChunk === "string") {
    return [];
  }
  return wordChunk
    .filter((w) => typeof w !== "string")
    .map((v) => {
      if (typeof v === "string") {
        return v;
      }
      if (isVue3) {
        return (v as { children: string }).children;
      }
      return (v as { children: { text: string }[] }).children[0].text;
    });
};
