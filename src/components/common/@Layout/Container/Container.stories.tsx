import { ComponentStory, ComponentMeta } from '@storybook/react';
import Container, { Props } from './Container';

export default {
  title: 'Layout/Container',
  component: Container,
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args: Props) => {
  return <div></div>;
};

export const Default = Template.bind({});
