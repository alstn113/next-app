import { ComponentStory, ComponentMeta } from '@storybook/react';
import Loading, { Props } from './Loading';

export default {
  title: 'components/common/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args: Props) => (
  <Loading {...args} />
);

export const Default = Template.bind({});

Default.args = {};
