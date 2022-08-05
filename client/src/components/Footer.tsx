import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import FooterTapItem from './FooterTapItem';
import { Bookmark, Home, PlusCircle, Search, Setting } from './vectors';

function Footer() {
  return (
    <Container>
      <FooterTapItem icon={<Home />} href="/" />
      <FooterTapItem icon={<Search />} href="/search" />
      <FooterTapItem icon={<PlusCircle />} href="/write" />
      <FooterTapItem icon={<Bookmark />} href="/bookmarks" />
      <FooterTapItem icon={<Setting />} href="/setting" />
    </Container>
  );
}

const Container = styled.footer`
  height: 56px;
  border-top: 1px solid black;
  ${flexCenter}
`;

export default Footer;
