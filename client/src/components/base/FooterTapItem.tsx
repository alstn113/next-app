import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const FooterTapItem = ({ title, icon, href }: Props) => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <Item>
      <Link href={href} passHref>
        <ActiveLink
          active={encodeURIComponent(asPath) === encodeURIComponent(href)}
        >
          {icon}
          <div>{title}</div>
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
  }
  ${({ active }) =>
    active
      ? css`
          svg,
          div {
            color: #fff;
          }
        `
      : css`
          svg,
          div {
            color: #6c6c6c;
          }
        `};
  ${flexCenter};
  flex-direction: column;
`;

export default FooterTapItem;
