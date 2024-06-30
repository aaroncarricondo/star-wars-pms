import { useState } from "react";

import { EmptyTableRow } from "./EmptyTableRow";
import { LoadingTableRow } from "./LoadingTableRow";
import { Pagination } from "./Pagination";
import { StyledTable, StyledTableRow, TableContainer } from "./styles";
import { TableColumn } from "./TableColumn";
import { TableHeader } from "./TableHeader";
import { ColumnDef, SortDirection, SortStatus, TableProps } from "./types";

export const PAGE_SIZE = 10;

export function Table<TData = never>({
  data,
  columns,
  isLoading,
  rowKeyGenerator,
  onRowClick,
}: TableProps<TData>) {
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<SortStatus<TData>>();

  const areRowsClickable = !!onRowClick;
  const onTableRowClick = (item: TData) =>
    areRowsClickable ? onRowClick(item) : undefined;

  const changeSortStatus = (
    { key, sorter }: ColumnDef<TData>,
    direction: SortDirection,
  ) => {
    setSortStatus({
      key,
      sorter,
      direction,
    });
  };

  const getSortedData = (): TData[] => {
    if (sortStatus && sortStatus.sorter) {
      const sortedData = [...data].sort(sortStatus.sorter);

      if (sortStatus.direction === SortDirection.Desc) {
        return sortedData.reverse();
      } else {
        return sortedData;
      }
    }

    return data;
  };

  const paginatedData = getSortedData().slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const isEmpty = !isLoading && data.length === 0;

  return (
    <>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              {columns.map((column) => (
                <TableHeader
                  key={column.key}
                  column={column}
                  sortStatus={sortStatus}
                  changeSortStatus={changeSortStatus}
                />
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
      </TableContainer>

      <Pagination
        page={page}
        dataLength={data.length}
        isLoading={isLoading}
        setPage={setPage}
      />
    </>
  );
}
