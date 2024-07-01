import { act, cleanup, screen, waitFor } from "@testing-library/react";

import { Table } from "../../../components/Table";
import { stringSorter } from "../../../utils/sortUtils";
import { customRender } from "../../testUtils/customRender";

describe("Table", () => {
  afterEach(() => {
    cleanup();
  });

  it("should order ascending when clicking on column header", async () => {
    customRender(
      <Table<{ id: string; name: string }>
        rowKeyGenerator={({ id }) => id}
        data={[
          { id: "1", name: "Tatooine" },
          { id: "2", name: "Alderaan" },
        ]}
        isLoading={false}
        columns={[
          {
            key: "name",
            dataIndex: "name",
            header: "Test header",
            sorter: (rowA, rowB) => stringSorter(rowA.name, rowB.name),
          },
        ]}
      />,
    );

    const testHeaderEl = screen.getByText("Test header");
    act(() => {
      testHeaderEl.click();
    });

    const rows = screen.getAllByRole("cell");
    expect(rows[0].innerHTML).toBe("Alderaan");
    expect(rows[1].innerHTML).toBe("Tatooine");
  });

  it("should order descending when clicking two times on column header", async () => {
    customRender(
      <Table<{ id: string; name: string }>
        rowKeyGenerator={({ id }) => id}
        data={[
          { id: "1", name: "Tatooine" },
          { id: "2", name: "Alderaan" },
        ]}
        isLoading={false}
        columns={[
          {
            key: "name",
            dataIndex: "name",
            header: "Test header",
            sorter: (rowA, rowB) => stringSorter(rowA.name, rowB.name),
          },
        ]}
      />,
    );

    const testHeaderEl = screen.getByText("Test header");
    act(() => {
      testHeaderEl.click();
    });
    act(() => {
      testHeaderEl.click();
    });

    await waitFor(() => {
      const rows = screen.getAllByRole("cell");
      expect(rows[0].innerHTML).toBe("Tatooine");
      expect(rows[1].innerHTML).toBe("Alderaan");
    });
  });
});
