export const customMediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

export const mediaQuery = {
  custom: customMediaQuery,
  xs: customMediaQuery(650),
  sm: customMediaQuery(960),
  md: customMediaQuery(1280),
  lg: customMediaQuery(1400),
  xl: customMediaQuery(1920),
};

export default mediaQuery;
