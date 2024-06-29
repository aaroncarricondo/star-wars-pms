import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    navbarHeight: string;
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
      error: string;
    };
    border: {
      radius: string;
      width: string;
    };
  }
}

declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}
