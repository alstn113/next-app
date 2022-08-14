import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spacer from '../Spacer/Spacer';
import Radio, { Props } from './Radio';

export default {
  title: 'components/common/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args: Props) => (
  <>
    <Radio {...args} />
    <Spacer />
    <Radio color="error" />
    <Spacer />
    <Radio color="secondary" />
    <Spacer />
    <Radio color="success" />
    <Spacer />
    <Radio color="warning" />
  </>
);

export const Default = Template.bind({});

Default.args = {};
