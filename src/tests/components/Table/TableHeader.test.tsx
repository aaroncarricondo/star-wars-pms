import { cleanup, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { TableHeader } from "../../../components/Table/TableHeader";
import { ColumnDef, SortDirection } from "../../../components/Table/types";
import { customRender } from "../../testUtils/customRender";

const customTableRender = (children: ReactNode) => {
  return customRender(
    <table>
      <thead>
        <tr>{children}</tr>
      </thead>
    </table>,
  );
};

describe("Table TableHeader", () => {
  afterEach(() => {
    cleanup();
  });

  const headerText = "Test header";
  const testColumn: ColumnDef = {
    key: "test",
    header: headerText,
  };

  it("order controls shouldn't be shown if it can't be sorted", () => {
    customTableRender(
      <TableHeader
        column={testColumn}
        sortStatus={undefined}
        changeSortStatus={() => undefined}
      />,
    );

    expect(screen.queryByTestId("order-controls")).toBeFalsy();
  });

  it("should change to ascending order if it's not sorted", () => {
    const mockedChangeSortStatus = vi.fn(() => undefined);
    customTableRender(
      <TableHeader
        column={testColumn}
        sortStatus={undefined}
        changeSortStatus={mockedChangeSortStatus}
      />,
    );

    screen.getByText(headerText).click();

    expect(mockedChangeSortStatus).toBeCalledWith(
      testColumn,
      SortDirection.Asc,
    );
  });

  it("should change to ascending order if actual sort order is descending", () => {
    const mockedChangeSortStatus = vi.fn(() => undefined);
    customTableRender(
      <TableHeader
        column={testColumn}
        sortStatus={{
          key: "test",
          direction: SortDirection.Desc,
          sorter: () => 0,
        }}
        changeSortStatus={mockedChangeSortStatus}
      />,
    );

    screen.getByText(headerText).click();

    expect(mockedChangeSortStatus).toBeCalledWith(
      testColumn,
      SortDirection.Asc,
    );
  });

  it("should change to descending order if actual sort order is ascending", () => {
    const mockedChangeSortStatus = vi.fn(() => undefined);
    customTableRender(
      <TableHeader
        column={testColumn}
        sortStatus={{
          key: "test",
          direction: SortDirection.Asc,
          sorter: () => 0,
        }}
        changeSortStatus={mockedChangeSortStatus}
      />,
    );

    screen.getByText(headerText).click();

    expect(mockedChangeSortStatus).toBeCalledWith(
      testColumn,
      SortDirection.Desc,
    );
  });
});
