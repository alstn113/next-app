import palette, { NormalColorType } from '@/lib/styles/palette';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.button<{
  size: 'sm' | 'md' | 'lg';
  color: NormalColorType;
  shadow: boolean;
}>`
  background: ${({ color }) => palette[color]};
  color: #fff;
  ${({ size }) =>
    size === 'sm'
      ? css`
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
        `
      : css`
          border-radius: 0.7rem;
          padding: 0.7rem 2rem;
        `}
  ${({ size }) =>
    size === 'lg' &&
    css`
      width: 100%;
    `}
  ${({ shadow, color }) =>
    shadow &&
    css`
      box-shadow: 0 4px 14px 0 ${palette[color]};
    `}
`;
