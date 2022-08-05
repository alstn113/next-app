import { css } from '@emotion/react';

export type NormalColorType =
  | 'primary'
  | 'success'
  | 'secondary'
  | 'warning'
  | 'error';

export type NormalSizeType = 'sm' | 'md' | 'lg';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
