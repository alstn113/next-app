import { forwardRef, InputHTMLAttributes } from 'react';
import * as S from './TextInput.styles';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <S.Input ref={ref} {...props} />;
});

TextInput.displayName = 'TextInput';

export default TextInput;
