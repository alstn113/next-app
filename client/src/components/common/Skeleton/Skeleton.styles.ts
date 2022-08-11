import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const shine = keyframes`  
    0% {
      opacity: 0.2;    
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.2;
    }
`;

export const Root = styled.div<{ circle: boolean }>`
  border-radius: 14px;
  width: 250px;
  height: 100px;
  display: flex;
  background-color: rgba(165, 165, 165);
  animation: ${shine} 1.8s infinite ease-in-out;
  ${({ circle }) =>
    circle &&
    css`
      border-radius: 50%;
      width: 100px;
      height: 100px;
    `}
`;
