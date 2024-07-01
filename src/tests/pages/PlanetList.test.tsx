import { cleanup, screen } from "@testing-library/react";

import * as PlanetsContext from "../../contexts/PlanetsContext";
import PlanetList from "../../pages/PlanetList";
import { customRender } from "../testUtils/customRender";

describe("Planet list", () => {
  afterEach(() => {
    cleanup();
  });

  describe("some error occurred", () => {
    beforeAll(() => {
      vi.spyOn(PlanetsContext, "usePlanets").mockImplementation(() => ({
        planets: [],
        allClimates: [],
        allTerrains: [],
        isLoading: false,
        error: new Error("Some error"),
        fetchData: async () => undefined,
        planetsDispatch: async () => undefined,
      }));
    });

    it("should show a toast error", async () => {
      customRender(<PlanetList />);

      expect(
        screen.queryByText("Error while retrieving planets data"),
      ).toBeTruthy();
    });

    it("should show empty table", async () => {
      customRender(<PlanetList />);

      expect(screen.queryByText("No data")).toBeTruthy();
    });
  });

  describe("planets data is loading", () => {
    it("should show a spinner inside the table", () => {
      vi.spyOn(PlanetsContext, "usePlanets").mockImplementation(() => ({
        planets: [],
        allClimates: [],
        allTerrains: [],
        isLoading: true,
        error: undefined,
        fetchData: async () => undefined,
        planetsDispatch: async () => undefined,
      }));

      customRender(<PlanetList />);

      expect(screen.queryByTestId("spinner")).toBeTruthy();
    });
  });

  describe("on user interaction", () => {
    it("should navigate when clicking a table row", () => {
      const mocks = vi.hoisted(() => {
        return {
          useNavigate: vi.fn(),
        };
      });
      vi.mock("react-router-dom", async (importOriginal) => {
        const mod = await importOriginal<typeof import("react-router-dom")>();
        return {
          ...mod,
          useNavigate: () => mocks.useNavigate,
        };
      });
      vi.spyOn(PlanetsContext, "usePlanets").mockImplementation(() => ({
        planets: [
          {
            id: "1",
            name: "Tatooine",
            climates: ["unknown"],
            terrains: ["unknown"],
          },
        ],
        allClimates: [],
        allTerrains: [],
        isLoading: false,
        error: undefined,
        fetchData: async () => undefined,
        planetsDispatch: async () => undefined,
      }));

      customRender(<PlanetList />);

      screen.getByText("Tatooine").click();
      expect(mocks.useNavigate).toBeCalled();
    });
  });
});
