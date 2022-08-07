import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import FooterTapItem from './FooterTapItem';
import { Bookmark, Home, PlusCircle, Search, Setting } from '../vectors';

function Footer() {
  return (
    <Container>
      <FooterTapItem title="홈" icon={<Home />} href="/" />
      <FooterTapItem title="검색" icon={<Search />} href="/search" />
      <FooterTapItem title="작성" icon={<PlusCircle />} href="/write" />
      <FooterTapItem title="북마크" icon={<Bookmark />} href="/bookmarks" />
      <FooterTapItem title="설정" icon={<Setting />} href="/setting" />d
    </Container>
  );
}

const Container = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 100;
  height: 60px;
  ${flexCenter}
  background-color: black;
`;

export default Footer;
