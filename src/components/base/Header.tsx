import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import { useRef, useState, useEffect, useCallback } from 'react';
import getScrollTop from '@/lib/utils/getScrollTop';
import zIndexes from '@/lib/styles/zIndexes';
import palette from '@/lib/styles/palette';

interface Props {
  title?: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
}

const Header = ({ title = 'ABYSS', headerLeft, headerRight }: Props) => {
  return (
    <Container>
      {headerLeft && <HeaderSide position="left">{headerLeft}</HeaderSide>}
      <Title>{title}</Title>
      {headerRight && <HeaderSide position="right">{headerRight}</HeaderSide>}
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  height: 60px;
  padding: 0 16px;
  z-index: ${zIndexes.Header};
  color: ${palette.white};
  background-color: ${palette.black};
  ${flexCenter}
  border-radius: 0 0 16px 16px;
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
