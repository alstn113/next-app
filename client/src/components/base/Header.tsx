import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  title?: React.ReactNode;
}

const Header = ({ title = 'NEXT' }: Props) => {
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
    </Container>
  );
};

const Container = styled.header<{ isScroll: boolean }>`
  background-color: ${({ isScroll }) => isScroll && 'red'};
  position: fixed;
  top: 0;
  height: 56px;
  border-bottom: 1px solid black;
  padding-left: 16px;
  padding-right: 16px;
  ${flexCenter}
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export default Header;
