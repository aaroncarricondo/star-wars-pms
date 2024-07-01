import { StyledTableColumn } from "./styles";
import { ColumnDef } from "./types";

const EMPTY_PLACEHOLDER = "-";

type TableColumnProps<TData = never> = {
  column: ColumnDef<TData>;
  item: TData;
};

export function TableColumn<TData>({ column, item }: TableColumnProps<TData>) {
  const { key, dataIndex, render } = column;

  if (render) {
    const renderContent = render(item) ?? EMPTY_PLACEHOLDER;

    return <StyledTableColumn key={key}>{renderContent}</StyledTableColumn>;
  } else if (dataIndex) {
    const text = item[dataIndex] as string;

    return (
      <StyledTableColumn key={key}>
        {text ?? EMPTY_PLACEHOLDER}
      </StyledTableColumn>
    );
  }

  return EMPTY_PLACEHOLDER;
}
