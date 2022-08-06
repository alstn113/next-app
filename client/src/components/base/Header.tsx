import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import useLogout from '@/libs/hooks/queries/auth/useLogout';
import useGetME from '@/libs/hooks/queries/user/useGetMe';

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

  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY === 0) {
      setIsScroll(false);
    } else {
      setIsScroll(true);
    }
  }, []);

  useEffect(() => {
    addEventListener('scroll', handleScroll);
    return () => {
      removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Container isScroll={isScroll}>
      <Title>{title}</Title>
      <button>{data ? data.username : '로그인 상태 아님'}</button>
      {data && <button onClick={() => mutate()}>로그아웃</button>}
    </Container>
  );
};

const Container = styled.header<{ isScroll: boolean }>`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  height: 60px;
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
