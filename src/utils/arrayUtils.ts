export const stringArrayToList = (stringArray: string[]): string => {
  let text = "";

  [...stringArray].sort().forEach((value) => {
    text += `${value}, `;
  });

  return text.slice(0, -2);
};
