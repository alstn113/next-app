import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Toggle, { Props } from './Toggle';

export default {
  title: 'components/common/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args: Props) => {
  return (
    <>
      <Toggle {...args} />
      <Spacer />
      <Toggle labelText="primary" color="primary" defaultChecked />
      <Spacer />
      <Toggle labelText="error" color="error" defaultChecked />
      <Spacer />
      <Toggle labelText="secondary" color="secondary" defaultChecked />
      <Spacer />
      <Toggle labelText="success" color="success" defaultChecked />
      <Spacer />
      <Toggle labelText="warning" color="warning" defaultChecked />
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
