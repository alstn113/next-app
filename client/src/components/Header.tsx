import useLogout from '@/libs/hooks/queries/auth/useLogout';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import styled from '@emotion/styled';
import Link from 'next/link';

const Header = () => {
  const { data } = useGetME();
  const { mutate } = useLogout({
    onSuccess: () => {
      window.location.href = '/';
    },
  });
  return (
    <div>
      <div>
        <StyledButton>{data ? data.username : '로그인 상태 아님'}</StyledButton>
        {data && <button onClick={() => mutate()}>로그아웃</button>}
      </div>
      <div>
        <StyledLink href={'/'}>Home</StyledLink>
        <Link href={'/counter'}>Counter</Link>
        <Link href={'/write'}>Write</Link>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'}>Register</Link>
      </div>
    </div>
  );
};

const StyledLink = styled(Link)`
  font-size: 5rem;
  color: red;
  &:hover {
    color: blue;
  }
`;

const StyledButton = styled.button`
  font-size: 5rem;
  color: red;
`;

export default Header;
