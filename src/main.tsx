import "react-toastify/dist/ReactToastify.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { PlanetsProvider } from "./contexts/PlanetsContext";
import { router } from "./navigation";
import { darkTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    color-scheme: dark;

    font-family: "Oxanium",-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  }
`;

const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache({}),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={darkTheme}>
      <ToastContainer theme="colored" />
      <GlobalStyle />

      <PlanetsProvider>
        <RouterProvider router={router} />
      </PlanetsProvider>
    </ThemeProvider>
  </ApolloProvider>,
);
