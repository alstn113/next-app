import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      white: string;
      gray: string;
      black: string;
      primary: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
    };
    font: {
      sm: css;
      md: css;
      lg: css;
    };
    borderRadius: {
      lg: css;
      md: css;
      sm: css;
    };
    media: {
      custom: (maxWidth: number) => string;
      labtop: string;
      mobile: string;
    };
  }
}
