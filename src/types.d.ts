import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    spacing: {
      none: string;
      extraSmall: string;
      small: string;
      normal: string;
      large: string;
    };
    colors: {
      background: string;
      headerBackground: string;
      primary: string;
      highlight: string;
      text: string;
      separator: string;
    };
    border: {
      radius: string;
      width: string;
    };
  }
}
