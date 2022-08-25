import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import Footer from '../base/Footer';
import Header from '../base/Header';

interface Props {
  children?: React.ReactNode;
}

const TabLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Container>
        <Content>{children}</Content>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin: 80px 0;
  height: 100%;
  ${flexCenter};
`;

const Content = styled.div`
  ${flexCenter};
  height: 100%;
  flex-direction: column;
`;

export default TabLayout;
