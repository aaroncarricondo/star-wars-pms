/// <reference lib="dom" />

import { cleanup, screen } from "@testing-library/react";
import {
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  mock,
  spyOn,
} from "bun:test";
import * as ReactRouter from "react-router-dom";

import * as PlanetsContext from "../contexts/PlanetsContext";
import { PlanetList } from "../pages/PlanetList";
import { customRender } from "./utils/customRender";

describe("Planet list", () => {
  afterEach(() => {
    cleanup();
  });

  describe("some error occurred", () => {
    beforeAll(() => {
      spyOn(PlanetsContext, "usePlanets").mockImplementation(() => ({
        planets: [],
        isLoading: false,
        error: new Error("Some error"),
        fetchData: async () => undefined,
      }));
    });

    it("should show a toast error", async () => {
      customRender(<PlanetList />);

      expect(
        screen.getByText("Error while retrieving planets data"),
      ).toBeTruthy();
    });

    it("should show empty table", async () => {
      customRender(<PlanetList />);

      expect(screen.getByText("No data")).toBeTruthy();
    });
  });

  describe("planets data is loading", () => {
    it("should show a spinner inside the table", () => {
      spyOn(PlanetsContext, "usePlanets").mockImplementation(() => ({
        planets: [],
        isLoading: true,
        error: undefined,
        fetchData: async () => undefined,
      }));

      customRender(<PlanetList />);

      expect(screen.getByTestId("spinner")).toBeTruthy();
    });
  });

  describe("on user interaction", () => {
    it("should navigate when clicking a table row", () => {
      const mockedNavigationFunction = mock(() => undefined);
      spyOn(ReactRouter, "useNavigate").mockImplementation(
        () => mockedNavigationFunction,
      );
      spyOn(PlanetsContext, "usePlanets").mockImplementation(() => ({
        planets: [
          {
            name: "Tatooine",
            climate: "",
            diameter: "",
            gravity: "",
            orbital_period: "",
            population: "",
            residents: [],
            rotation_period: [],
            surface_water: "",
            terrain: "",
            url: "planets/1/",
            films: [],
          },
        ],
        isLoading: false,
        error: undefined,
        fetchData: async () => undefined,
      }));

      customRender(<PlanetList />);

      screen.getByText("Tatooine").click();
      expect(mockedNavigationFunction).toBeCalled();
    });
  });
});
