import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { Layout } from "../pages/Layout";

const NotFound = lazy(() => import("../pages/NotFound"));
const PlanetList = lazy(() => import("../pages/PlanetList"));
const PlanetDetails = lazy(() => import("../pages/PlanetDetails"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PlanetList />,
      },
      {
        path: ":planetId",
        element: <PlanetDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
