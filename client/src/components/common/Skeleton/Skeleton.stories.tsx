import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Skeleton, { Props } from './Skeleton';

export default {
  title: 'components/common/Skeleton',
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args: Props) => {
  return (
    <Container>
      <Skeleton {...args} />
      <Skeleton />
      <Skeleton circle />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 1rem;
  div {
    margin-top: 1rem;
  }
`;

export const Default = Template.bind({});

Default.args = {};
