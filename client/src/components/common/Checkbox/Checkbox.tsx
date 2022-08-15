import * as S from './Checkbox.styles';
import { NormalColorType } from '@/lib/styles/palette';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  color?: NormalColorType;
}
const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { labelText = '', color = 'primary', ...options },
  ref,
) {
  return (
    <S.CheckboxLabel>
      <S.CheckboxInput type="checkbox" ref={ref} color={color} {...options} />
      <S.CheckboxPoint color={color} />
      <S.CheckboxText>{labelText}</S.CheckboxText>
    </S.CheckboxLabel>
  );
});

export default Checkbox;
