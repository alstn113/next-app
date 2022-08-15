import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spacer from '../Spacer/Spacer';
import Checkbox, { Props } from './Checkbox';

export default {
  title: 'components/common/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args: Props) => {
  return (
    <FlexColumn>
      <Checkbox {...args} />
      <Spacer y={2} />
      <Checkbox color="primary" labelText="primary" defaultChecked />
      <Spacer />
      <Checkbox color="success" labelText="success" defaultChecked />
      <Spacer />
      <Checkbox color="secondary" labelText="secondary" defaultChecked />
      <Spacer />
      <Checkbox color="warning" labelText="warning" defaultChecked />
      <Spacer />
      <Checkbox color="error" labelText="error" defaultChecked />
      <Spacer />
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
  color: 'primary',
  labelText: 'default',
  defaultChecked: true,
};
