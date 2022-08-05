import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoadingSpinner, { Props } from './LoadingSpinner';

export default {
  title: 'components/common/LoadingSpinner',
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = (args: Props) => (
  <LoadingSpinner {...args} />
);

export const Default = Template.bind({});

Default.args = {};
