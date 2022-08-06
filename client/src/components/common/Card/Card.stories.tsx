import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card, { Props } from './Card';

export default {
  title: 'components/common/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args: Props) => (
  <Card {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: 'A Basic Card',
};
