import { flexCenter } from '@/styles/shared';
import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextInput, { Props } from './TextInput';

export default {
  title: 'components/common/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args: Props) => {
  return (
    <Container>
      <TextInput {...args} />
      <TextInput placeholder="password" color="primary" />
      <TextInput placeholder="password" color="error" />
      <TextInput placeholder="password" color="secondary" />
      <TextInput placeholder="password" color="success" />
      <TextInput placeholder="password" color="warning" />
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem;
  width: 250px;
`;
export const Default = Template.bind({});

Default.args = {
  placeholder: 'USERNAME',
};
