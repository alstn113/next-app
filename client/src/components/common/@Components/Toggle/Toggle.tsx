import { NormalColorType } from '@/lib/styles/palette';
import { forwardRef, InputHTMLAttributes } from 'react';
import * as S from './Toggle.styles';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  color?: NormalColorType;
}

const Toggle = forwardRef<HTMLInputElement, Props>(function Toggle(
  { labelText = '', color = 'primary', ...options },
  ref,
) {
  return (
    <S.ToggleLabel>
      <S.ToggleText>{labelText}</S.ToggleText>
      <S.ToggleCheckbox type="checkbox" ref={ref} color={color} {...options} />
      <S.ToggleSwitch />
    </S.ToggleLabel>
  );
});

export default Toggle;
