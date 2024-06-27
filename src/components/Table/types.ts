import { Key, ReactNode } from "react";

export type ColumnDef<TData = never> = {
  key: string;
  header: ReactNode;
  dataIndex?: keyof TData;
  colSpan?: number;
  ellipsis?: boolean;
  render?: (item: TData) => ReactNode;
};

export type TableProps<TData = never> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  rowKeyGenerator: (item: TData) => Key;
  onRowClick?: (item: TData) => void;
};
