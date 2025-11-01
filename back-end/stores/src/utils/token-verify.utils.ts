export const tokenVerify = (text: string, key: string) => {
  const textToLowerCase = text.toLocaleLowerCase();
  const keyToLowerCase = key.toLocaleLowerCase();
  return textToLowerCase.includes(keyToLowerCase);
};
