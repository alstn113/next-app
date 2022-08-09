import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import useLogout from '@/libs/hooks/queries/auth/useLogout';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import Router from 'next/router';
import { useRef, useState, useEffect, useCallback } from 'react';
import Button from '../common/Button/Button';
import getScrollTop from '@/libs/utils/getScrollTop';

interface Props {
  title?: React.ReactNode;
}

const Header = ({ title = 'ABYSS' }: Props) => {
  const { data } = useGetME();
  const { mutate } = useLogout({
    onSuccess: () => {
      window.location.href = '/';
    },
  });

  const blockRef = useRef<HTMLDivElement>(null);
  const [marginTop, setMarginTop] = useState(0);

  useEffect(() => {
    if (!blockRef.current) return;
    setMarginTop(0);
  }, []);

  const height = 60;
  const prevScrollTop = useRef(0);
  const direction = useRef<'UP' | 'DOWN'>('DOWN');
  const transitionPoint = useRef(height);

  const handleScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    const nextDirection = prevScrollTop.current > scrollTop ? 'UP' : 'DOWN';

    if (
      direction.current === 'DOWN' &&
      nextDirection === 'UP' &&
      transitionPoint.current - scrollTop < 0
    ) {
      transitionPoint.current = scrollTop;
    } else if (
      direction.current === 'UP' &&
      nextDirection === 'DOWN' &&
      scrollTop - transitionPoint.current < -1 * height
    ) {
      transitionPoint.current = scrollTop + height;
    }

    if (direction.current === 'UP' && nextDirection === 'UP') {
      setMarginTop(
        Math.min(0, -1 * height + transitionPoint.current - scrollTop),
      );
    } else if (direction.current === 'DOWN' && nextDirection === 'DOWN') {
      setMarginTop(
        Math.max(-60, -1 * height + transitionPoint.current - scrollTop),
      );
    }

    direction.current = nextDirection;
    prevScrollTop.current = scrollTop;
  }, [height]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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
        <Button
          size="sm"
          color="warning"
          shadow
          onClick={() => Router.push('/login')}
        >
          로그인
        </Button>
      )}
      {data && (
        <Button size="sm" color="warning" shadow onClick={() => mutate()}>
          로그아웃
        </Button>
      )}
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
  div + button,
  div + div {
    margin-left: 1rem;
  }
  background-color: #000;
  color: white;
  button {
    color: white;
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 900;
  text-shadow: 0 2px 4px white;
`;

export default Header;
