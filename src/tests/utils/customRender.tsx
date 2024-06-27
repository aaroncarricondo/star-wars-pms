import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import { PlanetsProvider } from "../../contexts/PlanetsContext";
import { darkTheme } from "../../theme";

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <ToastContainer />
      <PlanetsProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </PlanetsProvider>
    </ThemeProvider>
  );
};

export const customRender = (ui: React.ReactNode, options?: RenderOptions) =>
  render(ui, {
    wrapper: Wrapper,
    ...options,
  });
