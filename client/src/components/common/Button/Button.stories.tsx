import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button, { Props } from './Button';

export default {
  title: 'components/common/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: Props) => (
  <>
    <Button {...args} />
    <Spacer />
    <Button shadow color="error">
      버튼
    </Button>
    <Spacer />
    <Button shadow color="secondary">
      버튼
    </Button>
    <Spacer />
    <Button shadow color="success">
      버튼
    </Button>
    <Spacer />
    <Button shadow color="warning">
      버튼
    </Button>
  </>
);

const Spacer = styled.div`
  margin-top: 1rem;
`;

export const Default = Template.bind({});

Default.args = {
  children: '버튼',
};
