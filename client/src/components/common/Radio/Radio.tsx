import { NormalColorType } from '@/lib/styles/palette';

export interface Props {
  color: NormalColorType;
}

const Radio = ({ color = 'primary' }: Props) => {
  return <div>Radio</div>;
};

export default Radio;
