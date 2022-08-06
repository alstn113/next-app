import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import useLogout from '@/libs/hooks/queries/auth/useLogout';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import Router from 'next/router';

interface Props {
  title?: React.ReactNode;
}

const Header = ({ title = 'NEXT' }: Props) => {
  const { data } = useGetME();
  const { mutate } = useLogout({
    onSuccess: () => {
      window.location.href = '/';
    },
  });

  return (
    <Container>
      <Title>{title}</Title>
      {data ? (
        <div>{data.username}</div>
      ) : (
        <button onClick={() => Router.push('/login')}>로그인</button>
      )}
      {data && <button onClick={() => mutate()}>로그아웃</button>}
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  height: 10vh;
  ${flexCenter};
  background-color: #000;
  color: white;
  button {
    color: white;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export default Header;
