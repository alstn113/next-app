import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const router = useRouter();
  const { asPath } = router;
  return (
    <Link href={href} passHref>
      {encodeURIComponent(asPath) === encodeURIComponent(href) ? (
        <StyledLink>{children}</StyledLink>
      ) : (
        <a>{children}</a>
      )}
    </Link>
  );
};

const StyledLink = styled('a')`
  color: brown;
`;

export default NavLink;
