import { useState } from "react";
import {
  XYPlot,
  YAxis,
  HorizontalGridLines,
  AreaSeries,
  Crosshair,
  DiscreteColorLegend,
} from "react-vis";
import Image from "next/image";
import AutoSizer from "react-virtualized-auto-sizer";
import formatCurrencyToSymbol from "../../lib/helperFunctions/formatCurrencySymbol";
import SelectUI from "../utilities/SelectUI";
import { dateRanges } from "../../lib/common/dateRange";
import imageLoader from "../../lib/helperFunctions/loader";
import numberWithCommas from "../../lib/helperFunctions/numberWithComma";

const ListerAreaChart = () => {
  //   const { push } = useRouter();
  const [crosshairValues, setCrossHairValues] = useState<any[]>([]);
  const [dateRange, selectDateRange] = useState<string | null>("thisWeek");
  const [showChart] = useState<boolean>(false);
  const onNearestX = (val: any, e: any) => {
    console.log(val, e);
    const value = [val];
    setCrossHairValues(value);
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="pb-8">
          <h3 className="text-base">Total Offset Bids</h3>
          {showChart && <p>{numberWithCommas(3000000)}</p>}
          {!showChart && <p>0.00</p>}
        </div>
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
              src="/assets/icons/barChartEmpty.svg"
              alt="Icon"
              width={130}
              height={130}
            />
            <p className="opacity-50">There has been no offset bid made on this product</p>
          </div>
        </div>
      )}
      {showChart && (
        <div className="h-[300px] w-[100%]">
          <AutoSizer>
            {({ height, width }) => (
              <XYPlot
                stackBy="y"
                margin={{ left: 50 }}
                className=""
                height={height}
                width={width}
                onMouseLeave={() => setCrossHairValues([])}
              >
                <HorizontalGridLines />
                <AreaSeries
                  onNearestX={onNearestX}
                  data={[
                    { x: 1, y: 2000 },
                    { x: 2, y: 150 },
                    { x: 3, y: 500 },
                    { x: 4, y: 2500 },
                    { x: 5, y: 600 },
                  ]}
                  opacity={0.4}
                />
                <AreaSeries
                  onNearestX={onNearestX}
                  data={[
                    { x: 1, y: 1000 },
                    { x: 2, y: 150 },
                    { x: 3, y: 300 },
                    { x: 4, y: 250 },
                    { x: 5, y: 800 },
                  ]}
                  opacity={0.4}
                />
                <AreaSeries
                  onNearestX={onNearestX}
                  data={[
                    { x: 1, y: 1000 },
                    { x: 2, y: 150 },
                    { x: 3, y: 300 },
                    { x: 4, y: 250 },
                    { x: 5, y: 800 },
                  ]}
                  opacity={0.4}
                />

                <YAxis tickFormat={(d) => `${formatCurrencyToSymbol(d)}`} />
                <DiscreteColorLegend
                  className="mx-auto -mt-10 text-sm w-[100%] ml-auto text-center"
                  items={["Project 1", "Project 2", "Project 3"]}
                  orientation="horizontal"
                />
                <Crosshair values={crosshairValues} />
              </XYPlot>
            )}
          </AutoSizer>
        </div>
      )}
    </>
  );
};

export default ListerAreaChart;
