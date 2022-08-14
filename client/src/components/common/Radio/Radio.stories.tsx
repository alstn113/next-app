import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Radio, { Props } from './Radio';

export default {
  title: 'components/common/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args: Props) => {
  return (
    <>
      <Radio {...args} />
      <Spacer />
      <Radio labelText="primary" color="primary" defaultChecked />
      <Spacer />
      <Radio labelText="error" color="error" defaultChecked />
      <Spacer />
      <Radio labelText="secondary" color="secondary" defaultChecked />
      <Spacer />
      <Radio labelText="success" color="success" defaultChecked />
      <Spacer />
      <Radio labelText="warning" color="warning" defaultChecked />
    </>
  );
};

const Spacer = styled.div`
  margin-top: 1rem;
`;

export const Default = Template.bind({});

Default.args = {
  labelText: '필수',
};
