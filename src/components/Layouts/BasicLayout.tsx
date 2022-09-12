import useGoBack from '@/hooks/useGoBack';
import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import React from 'react';
import FullHeightPage from '../base/FullHeightPage';
import Header from '../base/Header';
import HeaderBackButton from '../base/HeaderBackButton';

interface Props {
  title?: React.ReactNode;
  children: React.ReactNode;
  hasBackButton?: boolean;
  headerRight?: React.ReactNode;
}

const BasicLayout = ({
  title,
  children,
  hasBackButton,
  headerRight,
}: Props) => {
  const onGoBack = useGoBack();
  return (
    <FullHeightPage>
      <Header
        title={title}
        headerLeft={
          hasBackButton ? <HeaderBackButton onClick={onGoBack} /> : undefined
        }
        headerRight={headerRight}
      />
      <Container>
        <Content>{children}</Content>
      </Container>
    </FullHeightPage>
  );
};

const Container = styled.div`
  margin: 80px 0;
  height: 100%;
  ${flexCenter};
`;

const Content = styled.div`
  ${flexCenter};
  height: 100%;
  flex-direction: column;
`;

export default BasicLayout;
