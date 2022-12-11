import { useEffect, useState } from "react";
// import { ColumnType, TablePaginationConfig } from "antd/lib/table";
// import { FilterValue, SorterResult } from "antd/lib/table/interface";
import { TablePaginationConfig } from "antd";
import Image from "next/image";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import {
  dummyData,
  columns as offsetterColumns,
} from "../../lib/common/offsetterBoad";
import SelectUI from "../utilities/SelectUI";
import { dateRanges } from "../../lib/common/dateRange";
import TableUI from "../utilities/TableUI";
import imageLoader from "../../lib/helperFunctions/loader";

const OffsetterTable = () => {
  const [columns, setColumns] = useState(offsetterColumns);
  const [data, setData] = useState(dummyData);
  const [dateRange, selectDateRange] = useState<string | null>("thisWeek");
  const [loading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 13,
  });
  const [showChart] = useState<boolean>(false);

  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any>[] | SorterResult<any>
  ) => {
    console.log(pagination, filters, sorter);
    setPagination(pagination);
  };

  useEffect(() => {
    setColumns(offsetterColumns);
    setData(dummyData);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3>Offsetters</h3>
        <SelectUI
          menuItem={dateRanges}
          selectOption={selectDateRange}
          selected={dateRange}
        />
      </div>
      {!showChart && (
        <div className="w-[100%] h-[300px] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Image
              priority={true}
              unoptimized={true}
              loader={imageLoader}
              src="/assets/icons/pieChartEmpty.svg"
              alt="Icon"
              width={150}
              height={150}
            />
            <p className="opacity-50">
              There is currently no Offsetter on this project
            </p>
          </div>
        </div>
      )}
      {showChart && (
        <TableUI
          loading={loading}
          pagination={pagination}
          handleChange={handleChange}
          columns={columns}
          data={data}
        />
      )}
    </div>
  );
};

export default OffsetterTable;
