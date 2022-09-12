import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import { ArrowLeft } from '../vectors';

interface Props {
  onClick: () => void;
}

const HeaderBackButton = ({ onClick }: Props) => {
  return (
    <ArrowLeftButton onClick={onClick}>
      <ArrowLeft />
    </ArrowLeftButton>
  );
};

const ArrowLeftButton = styled.button`
  color: white;
  ${flexCenter}
  padding: 8px;
  margin-left: -8px;
`;

export default HeaderBackButton;
