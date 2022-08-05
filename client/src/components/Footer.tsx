import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import FooterTapItem from './FooterTapItem';
import {
  SvgHome,
  SvgBookmark,
  SvgPlusCircle,
  SvgSearch,
  SvgSetting,
} from './vectors';

function Footer() {
  return (
    <Container>
      <FooterTapItem icon={<SvgHome />} href="/" />
      <FooterTapItem icon={<SvgSearch />} href="/search" />
      <FooterTapItem icon={<SvgPlusCircle />} href="/write" />
      <FooterTapItem icon={<SvgBookmark />} href="/bookmarks" />
      <FooterTapItem icon={<SvgSetting />} href="/setting" />
    </Container>
  );
}

const Container = styled.footer`
  height: 56px;
  border-top: 1px solid black;
  ${flexCenter}
`;

export default Footer;
