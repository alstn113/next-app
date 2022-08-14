import { NormalColorType } from '@/lib/styles/palette';
import { forwardRef, InputHTMLAttributes } from 'react';
import * as S from './TextInput.styles';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  color?: NormalColorType;
}

const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  { placeholder, color = 'primary', ...props },
  ref,
) {
  return (
    <S.Root>
      <S.Input
        autoComplete="off"
        placeholder=" "
        color={color}
        ref={ref}
        {...props}
      />
      <S.Label color={color}>{placeholder}</S.Label>
    </S.Root>
  );
});

export default TextInput;
