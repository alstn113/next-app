import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import Button from '../Button/Button';
import Modal, { Props } from './Modal';

export default {
  title: 'components/common/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Modal Open</Button>
      <Modal
        {...args}
        visible={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = { title: 'This is Modal', message: 'This is Message' };
