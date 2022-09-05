import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import { useRef, useState, useEffect, useCallback } from 'react';
import getScrollTop from '@/lib/utils/getScrollTop';
import zIndexes from '@/lib/styles/zIndexes';

interface Props {
  title?: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
}

const Header = ({ title = 'ABYSS', headerLeft, headerRight }: Props) => {
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

    if (direction.current === 'DOWN' && nextDirection === 'DOWN') {
      setMarginTop(
        Math.max(-60, -1 * height + transitionPoint.current - scrollTop),
      );
    } else {
      setMarginTop(
        Math.min(0, -1 * height + transitionPoint.current - scrollTop),
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
      {headerLeft && <HeaderSide position="left">{headerLeft}</HeaderSide>}
      <Title>{title}</Title>
      {headerRight && <HeaderSide position="right">{headerRight}</HeaderSide>}
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: ${zIndexes.Header};
  height: 60px;
  ${flexCenter};
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

const HeaderSide = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  ${({ position }) => position} : 16px;
  height: 100%;
  ${flexCenter}
`;

export default Header;
