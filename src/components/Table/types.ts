import { Key, ReactNode } from "react";

export const enum SortDirection {
  Asc = "Asc",
  Desc = "Desc",
}

type SortFunction<TData> = (rowA: TData, rowB: TData) => number;

export type SortStatus<TData> = {
  key: string;
  direction: SortDirection;
  sorter?: SortFunction<TData>;
};

export type ColumnDef<TData = never> = {
  key: string;
  header: ReactNode;
  dataIndex?: keyof TData;
  render?: (item: TData) => ReactNode;
  sorter?: SortFunction<TData>;
};

export type TableProps<TData = never> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading: boolean;
  rowKeyGenerator: (item: TData) => Key;
  onRowClick?: (item: TData) => void;
};
