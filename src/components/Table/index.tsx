import { HTMLAttributes } from "react";

import { StyledTable, StyledTableColumn, StyledTableHeader } from "./styles";
import { TableColumn } from "./TableColumn";
import { TableProps } from "./types";

export function Table<TData = never>({
  data,
  columns,
  isLoading,
  rowKeyGenerator,
  ...restProps
}: TableProps<TData> & HTMLAttributes<HTMLTableElement>) {
  const isEmpty = !isLoading && data.length === 0;

  return (
    <StyledTable {...restProps}>
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
        {isEmpty && (
          <tr key="empty">
            <StyledTableColumn colSpan={1000}>
              {/* TODO: Improve */}
              <span>No data</span>
            </StyledTableColumn>
          </tr>
        )}
        {data.map((item) => (
          <tr key={rowKeyGenerator(item)}>
            {columns.map((column) => (
              <TableColumn key={column.key} column={column} item={item} />
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
