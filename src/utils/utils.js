import { alpha } from '@mui/material';

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export const textShortner = (text, length) => {
  if (text && text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
};

const colors = ['#5C7285', '#818C78', '#D2665A', '#48A6A7', '#16404D', '#809D3C', '#578E7E', '#E16A54'];
export const getRandomColor = () => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return alpha(color, 0.8);
};
