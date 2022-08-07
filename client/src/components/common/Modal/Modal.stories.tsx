import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal, { Props } from './Modal';

export default {
  title: 'components/common/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args: Props) => (
  <Modal {...args} />
);

export const Default = Template.bind({});

Default.args = {};
