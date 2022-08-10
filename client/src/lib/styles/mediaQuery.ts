export const customMediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

export const mediaQuery = {
  custom: customMediaQuery,
  large: customMediaQuery(1440),
  medium: customMediaQuery(1024),
  small: customMediaQuery(768),
};

export default mediaQuery;
