import { useState } from "react";

import { EmptyTableRow } from "./EmptyTableRow";
import { LoadingTableRow } from "./LoadingTableRow";
import { Pagination } from "./Pagination";
import { StyledTable, StyledTableHeader, StyledTableRow } from "./styles";
import { TableColumn } from "./TableColumn";
import { TableProps } from "./types";

export const PAGE_SIZE = 10;

export function Table<TData = never>({
  data,
  columns,
  isLoading,
  rowKeyGenerator,
  onRowClick,
}: TableProps<TData>) {
  const [page, setPage] = useState(1);

  const areRowsClickable = !!onRowClick;
  const isEmpty = !isLoading && data.length === 0;

  const onTableRowClick = (item: TData) =>
    areRowsClickable ? onRowClick(item) : undefined;

  const paginatedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            {columns.map(({ header, key, colSpan }) => (
              <StyledTableHeader key={key} colSpan={colSpan}>
                {header}
              </StyledTableHeader>
            ))}
          </tr>
        </thead>

        <tbody>
          {isEmpty && <EmptyTableRow />}
          {isLoading ? (
            <LoadingTableRow />
          ) : (
            paginatedData.map((item) => (
              <StyledTableRow
                key={rowKeyGenerator(item)}
                $isClickable={areRowsClickable}
                onClick={() => onTableRowClick(item)}
              >
                {columns.map((column) => (
                  <TableColumn key={column.key} column={column} item={item} />
                ))}
              </StyledTableRow>
            ))
          )}
        </tbody>
      </StyledTable>
      <Pagination
        page={page}
        dataLength={data.length}
        isLoading={isLoading}
        setPage={setPage}
      />
    </>
  );
}
