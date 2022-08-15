import { ComponentStory, ComponentMeta } from '@storybook/react';
import Checkbox, { Props } from './Checkbox';

export default {
  title: 'components/common/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args: Props) => {
  return (
    <>
      <Checkbox {...args} />
    </>
  );
};

export const Default = Template.bind({});

Default.args = {};
