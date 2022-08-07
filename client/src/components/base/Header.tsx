import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import useLogout from '@/libs/hooks/queries/auth/useLogout';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import Router from 'next/router';
import { useRef, useState, useEffect, useCallback } from 'react';

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

  const blockRef = useRef<HTMLDivElement>(null);
  const [marginTop, setMarginTop] = useState(0);

  const getScrollTop = () => {
    if (!document.body) return 0;
    const scrollTop = document.documentElement
      ? document.documentElement.scrollTop || document.body.scrollTop
      : document.body.scrollTop;
    return scrollTop;
  };

  useEffect(() => {
    if (!blockRef.current) return;
    setMarginTop(0);
  }, []);

  const height = 60;
  const prevScrollTop = useRef(0);
  const direction = useRef<'UP' | 'DOWN'>('DOWN');
  const transitionPoint = useRef(height);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    const nextDirection = prevScrollTop.current > scrollTop ? 'UP' : 'DOWN';
    if (
      direction.current === 'DOWN' &&
      nextDirection === 'UP' &&
      transitionPoint.current - scrollTop < 0
    ) {
      transitionPoint.current = scrollTop;
    }

    if (
      direction.current === 'UP' &&
      nextDirection === 'DOWN' &&
      scrollTop - transitionPoint.current < -1 * height
    ) {
      transitionPoint.current = scrollTop + height;
    }

    setMarginTop(
      Math.min(0, -1 * height + transitionPoint.current - scrollTop),
    );

    direction.current = nextDirection;
    prevScrollTop.current = scrollTop;
  }, [height]);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <Container
      style={{
        marginTop: marginTop,
      }}
      ref={blockRef}
    >
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
