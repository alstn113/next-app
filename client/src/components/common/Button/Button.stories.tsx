import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spacer from '../Spacer/Spacer';
import Button, { Props } from './Button';

export default {
  title: 'components/common/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: Props) => (
  <FlexColumn>
    <Button {...args} />
    <Spacer y={2} />
    <Button shadow color="primary">
      버튼
    </Button>
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
  </FlexColumn>
);

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Default = Template.bind({});

Default.args = {
  children: 'Default',
};
