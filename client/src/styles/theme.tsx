import { css } from '@emotion/react';

const color = {
  white: '#ffffff',
  gray: '#dfe6e9',
  black: '#000000',
  primary: '#0072F5',
  secondary: '#7828C8',
  success: '#17C964',
  warning: '#F5A524',
  error: '#F31260',
};

const font = {
  sm: css`
    font-size: 1rem;
    font-weight: 500;
  `,
  md: css`
    font-size: 1.5rem;
    font-weight: 600;
  `,
  lg: css`
    font-size: 2rem;
    font-weight: 700;
  `,
};

const borderRadius = {
  sm: css`
    border-radius: 0.5rem;
  `,
  md: css`
    border-radius: 1rem;
  `,
  lg: css`
    border-radius: 2rem;
  `,
};

const media = {
  custom: (maxWidth: number): string => {
    return `@media (max-width: ${maxWidth}px)`;
  },
  labtop: `@media (max-width: 1440px)`,
  mobile: `@media (max-width: 970px)`,
};

const theme = {
  color,
  font,
  borderRadius,
  media,
};

export default theme;
