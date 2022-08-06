import * as S from './Card.styles';

export type CardVariantType = 'shadow' | 'flat' | 'bordered';

export interface Props {
  children: React.ReactNode;
  variant?: CardVariantType;
}

const Card = ({ children, variant = 'shadow' }: Props) => {
  return <S.Root variant={variant}>{children}</S.Root>;
};

export default Card;
