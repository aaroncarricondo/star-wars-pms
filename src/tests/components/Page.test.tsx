/// <reference lib="dom" />

import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { Page } from "../../components/Layout/Page";
import { customRender } from "../utils/customRender";

describe("Page", () => {
  afterEach(() => {
    cleanup();
  });

  it("should change document title", () => {
    const title = "Page title";
    customRender(<Page title={title} />);

    expect(global.window.document.title).toBe(title);
  });
});
