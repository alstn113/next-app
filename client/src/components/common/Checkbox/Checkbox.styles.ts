import palette, { NormalColorType } from '@/lib/styles/palette';
import styled from '@emotion/styled';

export const CheckboxText = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  user-select: none;
`;

export const CheckboxPoint = styled.span`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 3px solid ${palette.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${palette.white};
  transition: 0.2s ease-in-out;
  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 24px;
    height: 24px;
    transform: scale(0.3);
    opacity: 0;
    border-radius: 8px;
    transition: inherit;
  }
  &::after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 8px;
    height: 8px;
    transform: scale(2);
    opacity: 0;
    background-color: ${palette.white};
    transition: inherit;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  &:hover ${CheckboxPoint} {
    background-color: ${palette.gray};
  }
`;

export const CheckboxInput = styled.input<{ color: NormalColorType }>`
  display: none;

  // Switch Off
  & ~ ${CheckboxPoint} {
  }

  // Switch On
  &:checked {
    & ~ ${CheckboxPoint} {
      &::before {
        background-color: ${({ color }) => palette[color]};
        transform: scale(1);
        opacity: 1;
      }
      &::after {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
`;
