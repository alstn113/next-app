import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spacer from '../Spacer/Spacer';
import TextInput, { Props } from './TextInput';

export default {
  title: 'components/common/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args: Props) => {
  return (
    <FlexColumn>
      <TextInput {...args} />
      <Spacer y={2} />
      <TextInput placeholder="password" color="primary" />
      <TextInput placeholder="password" color="error" />
      <TextInput placeholder="password" color="secondary" />
      <TextInput placeholder="password" color="success" />
      <TextInput placeholder="password" color="warning" />
    </FlexColumn>
  );
};

const FlexColumn = styled.div`
  display: flex;
  width: 250px;
  flex-direction: column;
  align-items: flex-start;
`;

export const Default = Template.bind({});

Default.args = {
  placeholder: 'USERNAME',
};
