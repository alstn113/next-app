import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spacer from '../Spacer/Spacer';
import Toggle, { Props } from './Toggle';

export default {
  title: 'components/common/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args: Props) => {
  return (
    <FlexColumn>
      <Toggle {...args} />
      <Spacer y={2} />
      <Toggle labelText="primary" color="primary" defaultChecked />
      <Spacer />
      <Toggle labelText="error" color="error" defaultChecked />
      <Spacer />
      <Toggle labelText="secondary" color="secondary" defaultChecked />
      <Spacer />
      <Toggle labelText="success" color="success" defaultChecked />
      <Spacer />
      <Toggle labelText="warning" color="warning" defaultChecked />
    </FlexColumn>
  );
};

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Default = Template.bind({});

Default.args = {
  labelText: 'default',
};
