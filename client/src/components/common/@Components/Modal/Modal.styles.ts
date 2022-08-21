import styled from '@emotion/styled';
import { css } from '@emotion/react';
import animations from '@/lib/styles/animations';
import zIndexes from '@/lib/styles/zIndexes';
import mediaQuery from '@/lib/styles/mediaQuery';

export const Fullscreen = styled('div')`
  position: fixed;
  z-index: ${zIndexes.Modal};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(249, 249, 249, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBlock = styled('div')<{ visible: boolean }>`
  width: 25rem;
  background: white;
  padding: 2rem 1.5rem;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
  h3 {
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 700;
  }
  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  ${mediaQuery.sm} {
    width: 15rem;
  }
  ${(props) =>
    props.visible
      ? css`
          animation: ${animations.appear} 0.4s forwards ease-in-out;
        `
      : css`
          animation: ${animations.disappear} 0.2s forwards ease-in-out;
        `}
`;

export const ButtonArea = styled('div')`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  button + button {
    margin-left: 0.75rem;
  }
`;
