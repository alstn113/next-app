import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}
const FullHeightPage = ({ children }: Props) => {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          div#__next {
            height: 100%;
          }
        `}
      />
      <Container>{children}</Container>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default FullHeightPage;
