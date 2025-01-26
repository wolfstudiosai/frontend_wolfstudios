export function pxToRem(value) {
  return `${value / 16}rem`;
}

export const textShortner = (text, length) => {
  if (text && text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
};
