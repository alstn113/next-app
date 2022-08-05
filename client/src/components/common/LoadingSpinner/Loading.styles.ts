import styled from '@emotion/styled';

export const Spinner = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  position: relative;
  width: 40px;
  height: 40px;
  margin: 90px auto;
  border-radius: 50%;
  border-top: 3px solid rgba(0, 0, 0, 0.2);
  border-right: 3px solid rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid rgba(0, 0, 0, 0.2);
  border-left: 3px solid #5cb85c;
  transform: translateZ(0);
  animation: spin 0.5s infinite linear;
`;
