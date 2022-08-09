import { NormalColorType } from '@/styles/shared';
import { forwardRef, InputHTMLAttributes } from 'react';
import * as S from './TextInput.styles';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  color?: NormalColorType;
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, color = 'primary', ...props }, ref) => {
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
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
