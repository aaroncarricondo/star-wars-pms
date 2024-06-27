/// <reference lib="dom" />

import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { PageHeader } from "../../components/PageHeader";
import { customRender } from "../utils/customRender";

describe("Page header", () => {
  afterEach(() => {
    cleanup();
  });

  it("should change document title", () => {
    const title = "Page title";
    customRender(<PageHeader title={title} />);

    expect(global.window.document.title).toBe(title);
  });
});
