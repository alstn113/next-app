import styled from '@emotion/styled';

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CheckboxText = styled.span`
  font-size: 1.2rem;
  font-weight: 900;
  user-select: none;
`;

export const CheckboxPoint = styled.span`
  &::after {
  }
`;

export const CheckboxInput = styled.input`
  display: none;

  // Switch Off
  & ~ ${CheckboxPoint} {
  }

  // Switch On
  &:checked {
    & ~ ${CheckboxPoint} {
      &::after {
      }
    }
  }
`;
