import { cleanup } from "@testing-library/react";

import { Page } from "../../components/Layout/Page";
import { customRender } from "../testUtils/customRender";

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
