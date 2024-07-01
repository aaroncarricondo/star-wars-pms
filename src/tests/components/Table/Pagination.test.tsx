import { cleanup, screen } from "@testing-library/react";

import { Pagination } from "../../../components/Table/Pagination";
import { customRender } from "../../testUtils/customRender";

describe("Table Pagination", () => {
  afterEach(() => {
    cleanup();
  });

  it("shouldn't be shown if it's loading", () => {
    customRender(
      <Pagination
        page={1}
        setPage={() => undefined}
        dataLength={11}
        isLoading={true}
      />,
    );

    const paginationText = screen.queryByText("1 of 2");
    expect(paginationText).toBeFalsy();
  });

  it("should show 2 pages if data length is 11", () => {
    customRender(
      <Pagination
        page={1}
        setPage={() => undefined}
        dataLength={11}
        isLoading={false}
      />,
    );

    const paginationText = screen.queryByText("1 of 2");
    expect(paginationText).toBeTruthy();
  });

  it("should return page to first one when data length changes", () => {
    const mockedSetPage = vi.fn(() => undefined);
    const { rerender } = customRender(
      <Pagination
        page={2}
        setPage={mockedSetPage}
        dataLength={11}
        isLoading={false}
      />,
    );

    rerender(
      <Pagination
        page={2}
        setPage={mockedSetPage}
        dataLength={12}
        isLoading={false}
      />,
    );

    expect(mockedSetPage).toBeCalledWith(1);
  });
});
