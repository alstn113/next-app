import { NormalColorType } from '@/lib/styles/palette';
import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import Card from '../Card/Card';
import Spacer from '../Spacer/Spacer';
import Checkbox, { Props } from './Checkbox';

export default {
  title: 'components/common/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args: Props) => {
  const CHECKBOX_LIST: { id: number; data: NormalColorType }[] = [
    { id: 1, data: 'primary' },
    { id: 2, data: 'success' },
    { id: 3, data: 'secondary' },
    { id: 4, data: 'warning' },
    { id: 5, data: 'error' },
  ];
  const [selected, setSelected] = useState<NormalColorType[]>([]);
  const onCheckedElement = (checked: any, item: any) => {
    if (checked) {
      setSelected([...selected, item]);
    } else if (!checked) {
      setSelected(selected.filter((el) => el !== item));
    }
  };

  return (
    <FlexColumn>
      {CHECKBOX_LIST.map((checkbox) => (
        <>
          <Checkbox
            key={checkbox.id}
            color={checkbox.data}
            labelText={checkbox.data}
            value={checkbox.data}
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            // 3️⃣ 체크표시 & 해제를 시키는 로직. 배열에 data가 있으면 true, 없으면 false
            checked={selected.includes(checkbox.data) ? true : false}
          />
          <Spacer />
        </>
      ))}
      <Card variant="flat">Selected : {selected.join(', ')}</Card>
    </FlexColumn>
  );
};

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Default = Template.bind({});
