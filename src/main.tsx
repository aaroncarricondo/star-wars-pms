import "react-toastify/dist/ReactToastify.css";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { PlanetsProvider } from "./contexts/PlanetsContext";
import { Layout } from "./pages/Layout";
import { PlanetDetails } from "./pages/PlanetDetails";
import { PlanetList } from "./pages/PlanetList";
import { darkTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    font-family: "Oxanium",-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  }
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PlanetList />,
      },
      {
        path: ":id",
        element: <PlanetDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={darkTheme}>
    <ToastContainer theme="colored" />
    <GlobalStyle />

    <PlanetsProvider>
      <RouterProvider router={router} />
    </PlanetsProvider>
  </ThemeProvider>,
);
