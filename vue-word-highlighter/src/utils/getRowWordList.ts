export const getRowWordList = (
  word: string,
  splittedWordList: string[]
): string[] => {
  const rowWordList: string[] = [];
  splittedWordList.forEach((splittedWord) => {
    const start = rowWordList.join("").length;
    const end = start + splittedWord.length;
    rowWordList.push(word.slice(start, end));
  });

  return rowWordList;
};
