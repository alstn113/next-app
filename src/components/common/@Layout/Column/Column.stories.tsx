import { ComponentStory, ComponentMeta } from '@storybook/react';
import Column, { Props } from './Column';

export default {
  title: 'Layout/Column',
  component: Column,
} as ComponentMeta<typeof Column>;

const Template: ComponentStory<typeof Column> = (args: Props) => {
  return <div></div>;
};

export const Default = Template.bind({});
