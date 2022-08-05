import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';

interface Props {
  title?: React.ReactNode;
}

const Header = ({ title = 'NEXT' }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.header`
  position: relative;
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
