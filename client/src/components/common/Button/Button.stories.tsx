import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button, { Props } from './Button';

export default {
  title: 'components/common/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: Props) => (
  <Button {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: '버튼',
};
