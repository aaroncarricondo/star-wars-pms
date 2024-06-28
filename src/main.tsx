import "react-toastify/dist/ReactToastify.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { PlanetsProvider } from "./contexts/PlanetsContext";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
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
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache({}),
  // No cache, isn't needed right now
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
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
