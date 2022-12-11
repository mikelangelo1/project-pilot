/* eslint-disable no-unused-vars */
import { PaginationProps, Table } from "antd";
import { ColumnType, TablePaginationConfig } from "antd/lib/table";
import { FilterValue, SorterResult } from "antd/lib/table/interface";

interface TableType {
  columns: ColumnType<any>[];
  data: any;
  className?: string;
  handleChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any>[] | SorterResult<any>
  ) => void;
  pagination: PaginationProps;
  loading: boolean;
}

export default ({
  columns,
  data,
  className,
  handleChange,
  pagination,

  loading,
}: TableType) => (
  <Table
    className={className ?? ""}
    sticky={true}
    columns={columns}
    dataSource={data}
    rowKey={(data) => data.id}
    scroll={{ y: 240 }}
    loading={loading}
    onChange={handleChange}
    pagination={pagination}
  />
);
