import { EmptyTableRow } from "./EmptyTableRow";
import { LoadingTableRow } from "./LoadingTableRow";
import { StyledTable, StyledTableHeader, StyledTableRow } from "./styles";
import { TableColumn } from "./TableColumn";
import { TableProps } from "./types";

export function Table<TData = never>({
  data,
  columns,
  isLoading,
  rowKeyGenerator,
  onRowClick,
}: TableProps<TData>) {
  const areRowsClickable = !!onRowClick;
  const isEmpty = !isLoading && data.length === 0;

  const onTableRowClick = (item: TData) =>
    areRowsClickable ? onRowClick(item) : undefined;

  return (
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
          data.map((item) => (
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
  );
}
