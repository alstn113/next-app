import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoadingSpinner, { Props } from './LoadingSpinner';

export default {
  title: 'Components/Loading',
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = (args: Props) => (
  <LoadingSpinner {...args} />
);

export const Default = Template.bind({});

Default.args = {};
