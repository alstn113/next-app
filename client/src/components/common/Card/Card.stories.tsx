import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card, { Props } from './Card';

export default {
  title: 'components/common/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args: Props) => {
  return (
    <>
      <Card {...args} />
      <Spacer />
      <Card variant="bordered">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima officia
        eius velit excepturi distinctio, blanditiis sunt, quod architecto
        voluptate perspiciatis ea corporis voluptatum, reprehenderit vero harum
        ratione animi hic cum.
      </Card>
      <Spacer />
      <Card variant="flat">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima officia
        eius velit excepturi distinctio, blanditiis sunt, quod architecto
        voluptate perspiciatis ea corporis voluptatum, reprehenderit vero harum
        ratione animi hic cum.
      </Card>
      <Spacer />
      <Card variant="shadow">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima officia
        eius velit excepturi distinctio, blanditiis sunt, quod architecto
        voluptate perspiciatis ea corporis voluptatum, reprehenderit vero harum
        ratione animi hic cum.
      </Card>
    </>
  );
};

const Spacer = styled.div`
  margin-top: 1rem;
`;

export const Default = Template.bind({});

Default.args = {
  children: 'A Basic Card',
};
