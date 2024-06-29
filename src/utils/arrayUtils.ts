export const stringArrayToList = (stringArray: string[]): string => {
  let text = "";

  for (const value of [...stringArray].sort()) {
    text += `${value}, `;
  }

  return text.slice(0, -2);
};

export const stringArrayIncludesCaseInsensitive = (
  stringArray: string[],
  loweredSearch: string,
): boolean => {
  for (const value of stringArray) {
    if (value.toLowerCase().includes(loweredSearch)) {
      return true;
    }
  }

  return false;
};
