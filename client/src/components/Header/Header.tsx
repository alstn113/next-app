import useLogout from '@/libs/hooks/queries/auth/useLogout';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import { Spacer, Container, Button } from '@nextui-org/react';
import Link from 'next/link';

const Header = () => {
  const { data: me } = useGetME({ onSuccess: (data) => {} });
  const { mutate } = useLogout({
    onSuccess: () => {
      window.location.href = '/';
    },
  });
  return (
    <Container css={{ mt: '$10', p: '$10', bg: '$accents1' }}>
      <Container
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button auto shadow>
          {me ? me.username : '로그인 상태 아님'}
        </Button>
        {me && (
          <Button auto shadow onPress={() => mutate()} css={{ ml: '$5' }}>
            로그아웃
          </Button>
        )}
      </Container>
      <Container css={{ d: 'flex', justifyContent: 'center' }}>
        <Link href={'/'}>Home</Link>
        <Spacer x={1} />
        <Link href={'/counter'}>Counter</Link>
        <Spacer x={1} />
        <Link href={'/write'}>Write</Link>
        <Spacer x={1} />
        <Link href={'/login'}>Login</Link>
        <Spacer x={1} />
        <Link href={'/register'}>Register</Link>
      </Container>
    </Container>
  );
};

export default Header;
