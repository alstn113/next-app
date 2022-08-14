import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import Card from '../Card/Card';
import Radio, { Props } from './Radio';

export default {
  title: 'components/common/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

type RadioValues =
  | 'default'
  | 'primary'
  | 'success'
  | 'secondary'
  | 'warning'
  | 'error';

const Template: ComponentStory<typeof Radio> = (args: Props) => {
  const [value, setValue] = useState<RadioValues>('error');

  const handleChange = (value: RadioValues) => {
    setValue(value);
  };
  return (
    <div>
      <Radio
        value="default"
        labelText="default"
        checked={value === 'default'}
        onChange={() => handleChange('default')}
        {...args}
      />
      <Spacer />
      <Radio
        value="primary"
        labelText="primary"
        color="primary"
        checked={value === 'primary'}
        onChange={() => handleChange('primary')}
      />
      <Spacer />
      <Radio
        value="success"
        labelText="success"
        color="success"
        checked={value === 'success'}
        onChange={() => handleChange('success')}
      />
      <Spacer />
      <Radio
        value="secondary"
        labelText="secondary"
        color="secondary"
        checked={value === 'secondary'}
        onChange={() => handleChange('secondary')}
      />
      <Spacer />
      <Radio
        value="warning"
        labelText="warning"
        color="warning"
        checked={value === 'warning'}
        onChange={() => handleChange('warning')}
      />
      <Spacer />
      <Radio
        value="error"
        labelText="error"
        color="error"
        checked={value === 'error'}
        onChange={() => handleChange('error')}
      />
      <Spacer />
      <Card variant="bordered">value : {value}</Card>
    </div>
  );
};

const Spacer = styled.div`
  margin-top: 1rem;
`;

export const Default = Template.bind({});

Default.args = {
  labelText: '필수',
};
