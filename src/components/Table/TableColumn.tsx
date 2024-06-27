import { StyledTableColumn } from "./styles";
import { ColumnDef } from "./types";

const EMPTY_PLACEHOLDER = "-";

type TableColumnProps<TData = never> = {
  column: ColumnDef<TData>;
  item: TData;
};

export function TableColumn<TData>({ column, item }: TableColumnProps<TData>) {
  const { key, dataIndex, render, colSpan, ellipsis } = column;

  if (render) {
    const renderContent = render(item) ?? EMPTY_PLACEHOLDER;

    let title: string | undefined = undefined;
    if (ellipsis && typeof renderContent === "string") {
      title = renderContent;
    }
    return (
      <StyledTableColumn
        key={key}
        colSpan={colSpan}
        $ellipsis={ellipsis}
        title={title}
      >
        {renderContent}
      </StyledTableColumn>
    );
  } else if (dataIndex) {
    const text = item[dataIndex] as string;
    let title: string | undefined = undefined;
    if (ellipsis) {
      title = text;
    }

    return (
      <StyledTableColumn
        key={key}
        colSpan={colSpan}
        $ellipsis={ellipsis}
        title={title}
      >
        {text ?? EMPTY_PLACEHOLDER}
      </StyledTableColumn>
    );
  }

  return EMPTY_PLACEHOLDER;
}
