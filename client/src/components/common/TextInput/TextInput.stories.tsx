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

export const Bordered = () => {
  return (
    <FlexColumn>
      <TextInput placeholder="TextInput" color="primary" variant="bordered" />
      <TextInput placeholder="TextInput" color="error" variant="bordered" />
      <TextInput placeholder="TextInput" color="secondary" variant="bordered" />
      <TextInput placeholder="TextInput" color="success" variant="bordered" />
      <TextInput placeholder="TextInput" color="warning" variant="bordered" />
    </FlexColumn>
  );
};

export const Underlined = () => {
  return (
    <FlexColumn>
      <TextInput placeholder="TextInput" color="primary" variant="underlined" />
      <TextInput placeholder="TextInput" color="error" variant="underlined" />
      <TextInput
        placeholder="TextInput"
        color="secondary"
        variant="underlined"
      />
      <TextInput placeholder="TextInput" color="success" variant="underlined" />
      <TextInput placeholder="TextInput" color="warning" variant="underlined" />
    </FlexColumn>
  );
};
