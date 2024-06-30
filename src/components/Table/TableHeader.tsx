// @ts-expect-error: Unreachable code error
import TriangleDownIcon from "../../assets/triangle-down-icon.svg";
// @ts-expect-error: Unreachable code error
import TriangleUpIcon from "../../assets/triangle-up-icon.svg";
import { Space } from "../Layout/Space";
import { SortIcon, StyledTableHeader } from "./styles";
import { ColumnDef, SortDirection, SortStatus } from "./types";

type TableHeaderProps<TData> = {
  column: ColumnDef<TData>;
  sortStatus: SortStatus<TData> | undefined;
  changeSortStatus: (
    column: ColumnDef<TData>,
    direction: SortDirection,
  ) => void;
};

export function TableHeader<TData>({
  column,
  sortStatus,
  changeSortStatus,
}: TableHeaderProps<TData>) {
  const canBeSorted = !!column.sorter;

  const isBeingSorted = sortStatus?.key === column.key;
  const ascentActive =
    isBeingSorted && sortStatus.direction === SortDirection.Asc;
  const descendActive =
    isBeingSorted && sortStatus.direction === SortDirection.Desc;

  const toggleSort = () => {
    if (!isBeingSorted || descendActive) {
      changeSortStatus(column, SortDirection.Asc);
    }
    if (ascentActive) {
      changeSortStatus(column, SortDirection.Desc);
    }
  };

  return (
    <StyledTableHeader $canBeSorted={canBeSorted} onClick={toggleSort}>
      <Space $justify="space-between" $gap="small" $wrap>
        {column.header}
        {canBeSorted && (
          <Space $direction="column" $gap="extraSmall">
            <SortIcon
              $show={!isBeingSorted || ascentActive}
              $height="7px"
              src={TriangleUpIcon}
            />
            <SortIcon
              $show={!isBeingSorted || descendActive}
              $height="7px"
              src={TriangleDownIcon}
            />
          </Space>
        )}
      </Space>
    </StyledTableHeader>
  );
}
