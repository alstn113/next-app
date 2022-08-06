import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextInput, { Props } from './TextInput';

export default {
  title: 'components/common/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args: Props) => (
  <TextInput {...args} />
);

export const Default = Template.bind({});

Default.args = {};
