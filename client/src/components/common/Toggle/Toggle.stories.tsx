import { ComponentStory, ComponentMeta } from '@storybook/react';
import Toggle, { Props } from './Toggle';

export default {
  title: 'components/common/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args: Props) => (
  <Toggle {...args} />
);

export const Default = Template.bind({});

Default.args = {
  labelText: '필수',
};
