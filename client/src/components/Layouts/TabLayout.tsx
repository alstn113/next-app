import useLogout from '@/libs/hooks/queries/auth/useLogout';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import styled from '@emotion/styled';
import FullHeightPage from '../common/FullHeightPage';
import Footer from '../Footer';
import Header from '../Header';

interface Props {
  children?: React.ReactNode;
}

const TabLayout = ({ children }: Props) => {
  const { data } = useGetME();
  const { mutate } = useLogout({
    onSuccess: () => {
      window.location.href = '/';
    },
  });

  return (
    <FullHeightPage>
      <Header />
      <button>{data ? data.username : '로그인 상태 아님'}</button>
      {data && <button onClick={() => mutate()}>로그아웃</button>}
      <Content>{children}</Content>
      <Footer />
    </FullHeightPage>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default TabLayout;
