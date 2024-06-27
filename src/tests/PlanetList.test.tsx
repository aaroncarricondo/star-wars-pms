/// <reference lib="dom" />

import { cleanup, screen } from "@testing-library/react";
import { sleep } from "bun";
import { afterEach, beforeAll, describe, expect, it, spyOn } from "bun:test";

import { PlanetList } from "../pages/PlanetList";
import { customRender } from "./utils/customRender";
import { getMockedFetch } from "./utils/mockedFetch";

const errorMockedFetch = getMockedFetch({
  ok: false,
}) as never;

describe("Planet list", () => {
  afterEach(() => {
    cleanup();
  });

  describe("fetch fails", () => {
    beforeAll(() => {
      spyOn(window, "fetch").mockImplementation(errorMockedFetch);
    });

    it("should show an error", async () => {
      customRender(<PlanetList />);

      // TODO: Remove it
      await sleep(1);

      expect(
        screen.getByText("Error while retrieving planets data"),
      ).toBeTruthy();
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
