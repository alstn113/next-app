import { ComponentStory, ComponentMeta } from '@storybook/react';
import Row, { Props } from './Row';

export default {
  title: 'Layout/Row',
  component: Row,
} as ComponentMeta<typeof Row>;

const Template: ComponentStory<typeof Row> = (args: Props) => {
  return <div></div>;
};

export const Default = Template.bind({});
