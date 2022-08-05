import { NormalColorType, NormalSizeType } from '@/styles/shared';
import { ButtonHTMLAttributes } from 'react';
import * as S from './Button.styles';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: NormalSizeType;
  children: React.ReactNode;
  color?: NormalColorType;
  shadow?: boolean;
}

const Button = ({
  size = 'md',
  color = 'primary',
  children,
  shadow = false,
  ...options
}: Props) => {
  return (
    <S.Container size={size} color={color} shadow={shadow} {...options}>
      {children}
    </S.Container>
  );
};

export default Button;
