import { NormalColorType } from '@/lib/styles/palette';
import { forwardRef, InputHTMLAttributes } from 'react';
import * as S from './Radio.styles';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  color?: NormalColorType;
  labelColor?: boolean;
}

const Radio = forwardRef<HTMLInputElement, Props>(function Radio(
  { labelText = '', labelColor = false, color = 'primary', ...options },
  ref,
) {
  return (
    <S.RadioLabel>
      <S.RadioInput type="radio" ref={ref} color={color} {...options} />
      <S.RadioPoint color={color} />
      <S.RadioText labelColor={labelColor} color={color}>
        {labelText}
      </S.RadioText>
    </S.RadioLabel>
  );
});

export default Radio;
