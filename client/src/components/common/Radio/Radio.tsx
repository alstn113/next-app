import { NormalColorType } from '@/lib/styles/palette';
import { forwardRef, InputHTMLAttributes } from 'react';
import * as S from './Radio.styles';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  color?: NormalColorType;
}

const Radio = forwardRef<HTMLInputElement, Props>(function Radio(
  { labelText = '', color = 'primary', ...options },
  ref,
) {
  return (
    <S.RadioLabel>
      <S.RadioText>{labelText}</S.RadioText>
      <S.Radio type="radio" ref={ref} color={color} {...options} />
      <S.RadioSwitch />
    </S.RadioLabel>
  );
});

export default Radio;
