import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      white: string;
      black: string;
      gray0: string;
      gray1: string;
      gray2: string;
      orange0: string;
      orange1: string;
      orange2: string;
    };
    font: {
      small: css;
      medium: css;
      large: css;
    };
    borderRadius: {
      large: css;
      medium: css;
      small: css;
    };
    media: {
      custom: (maxWidth: number) => string;
      labtop: string;
      mobile: string;
    };
  }
}
