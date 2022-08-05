import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import NavLink from '../common/NavLink';

interface Props {
  icon: React.ReactNode;
  href: string;
}

const FooterTapItem = ({ icon, href }: Props) => {
  return (
    <Item>
      <NavLink href={href}>{icon}</NavLink>
    </Item>
  );
};

const Item = styled.div`
  ${flexCenter};
  flex: 1;
  a {
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

export default FooterTapItem;
