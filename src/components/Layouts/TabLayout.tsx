import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import Footer from '../base/Footer';
import FullHeightPage from '../base/FullHeightPage';
import Header from '../base/Header';

interface Props {
  children?: React.ReactNode;
}

const TabLayout = ({ children }: Props) => {
  return (
    <FullHeightPage>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </FullHeightPage>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`;

export default TabLayout;
