import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavLink from '../common/NavLink';

interface Props {
  icon: React.ReactNode;
  href: string;
}

const FooterTapItem = ({ icon, href }: Props) => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <Item>
      <Link href={href} passHref>
        <ActiveLink
          active={encodeURIComponent(asPath) === encodeURIComponent(href)}
        >
          {icon}
        </ActiveLink>
      </Link>
    </Item>
  );
};

const Item = styled.div`
  ${flexCenter};
  flex: 1;
`;

const ActiveLink = styled('a')<{ active: boolean }>`
  svg {
    width: 32px;
    height: 32px;
    color: ${({ active }) => (active ? 'black' : 'gray')};
  }
`;

export default FooterTapItem;
