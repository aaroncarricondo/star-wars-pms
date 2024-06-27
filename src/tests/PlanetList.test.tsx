/// <reference lib="dom" />

import { cleanup, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, spyOn } from "bun:test";

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

  describe("toolbox", () => {
    it("should be shown", () => {
      customRender(<PlanetList />);

      expect(screen.getByText("New planet", { selector: "button" }));
      expect(screen.getByPlaceholderText("Search"));
    });
  });
});
