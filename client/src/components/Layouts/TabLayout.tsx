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
  display: flex;
  margin: 60px 0;
  overflow-y: scroll;
`;

export default TabLayout;
