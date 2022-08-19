import { ComponentStory, ComponentMeta } from '@storybook/react';
import Container, { Props } from './Container';

export default {
  title: 'components/common/Container',
  component: Container,
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args: Props) => {
  return <div></div>;
};

export const Default = Template.bind({});
