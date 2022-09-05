import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  hasBackButton?: boolean;
}

const BasicLayout = ({ children }: Props) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

const Container = styled.div``;
const Header = styled.header``;

export default BasicLayout;
