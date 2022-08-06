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
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

const Content = styled.div`
  ${flexCenter};
  height: 80vh;
  margin: 10vh 0;
  overflow-y: scroll;
`;

export default TabLayout;
