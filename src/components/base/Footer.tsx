import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import FooterTapItem from './FooterTapItem';
import { Bookmark, Home, PlusCircle, Search, Setting } from '../vectors';
import zIndexes from '@/lib/styles/zIndexes';
import palette from '@/lib/styles/palette';

function Footer() {
  return (
    <Container>
      <FooterTapItem title="홈" icon={<Home />} href="/" />
      <FooterTapItem title="검색" icon={<Search />} href="/search" />
      <FooterTapItem title="작성" icon={<PlusCircle />} href="/write" />
      <FooterTapItem title="북마크" icon={<Bookmark />} href="/bookmarks" />
      <FooterTapItem title="설정" icon={<Setting />} href="/setting" />
    </Container>
  );
}

const Container = styled.footer`
  z-index: ${zIndexes.Footer};
  height: 60px;
  display: flex;
  background-color: ${palette.black};
  border-radius: 16px 16px 0 0;
`;

export default Footer;
