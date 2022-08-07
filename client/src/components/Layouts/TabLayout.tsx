import { flexCenter } from '@/styles/shared';
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
  height: 80vh;
  margin-top: 60px;
  margin-bottom: 60px;
  height: 100%;
  ${flexCenter};
`;

const Content = styled.div`
  ${flexCenter};
  height: 100%;
  flex-direction: column;
`;

export default TabLayout;
