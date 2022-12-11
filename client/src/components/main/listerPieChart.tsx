import { useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { DiscreteColorLegend, Hint, RadialChart } from "react-vis";
import Image from "next/image";
import { dateRanges } from "../../lib/common/dateRange";

import SelectUI from "../utilities/SelectUI";
import imageLoader from "../../lib/helperFunctions/loader";

const dummyData = [
  {
    angle: 12000,
    label: "deck.gl",
    color: "#6979F8",
  },
  {
    angle: 30000,
    label: "math.gl",
    color: "#9BA6FA",
  },
  {
    angle: 4000,
    label: "probe.gl",
    color: "#E4E4E4",
  },
];

const ListerPieChart = () => {
  const [data] = useState(dummyData);
  const [hint, setHint] = useState<null | any>(null);
  const [dateRange, selectDateRange] = useState<string | null>("thisWeek");
  const [showChart] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-center mb-2">
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
              src="/assets/icons/barChartEmpty.svg"
              alt="Icon"
              width={130}
              height={130}
            />
            <p className="opacity-50 text-center">
              There is currently no Offsetter on this project
            </p>
          </div>
        </div>
      )}
      {showChart && (
        <div className="h-[300px] w-[100%]">
          <AutoSizer>
            {({ height, width }) => (
              <RadialChart
                colorType="literal"
                innerRadius={110}
                radius={70}
                data={data}
                color={(d: any) => d.color}
                width={width}
                height={height}
                animation="gentle"
                onValueMouseOver={(v) => setHint(v)}
                onSeriesMouseOut={() => setHint(null)}
              >
                {hint && <Hint value={hint} />}
                <DiscreteColorLegend
                  className="mx-auto -mt-2 text-sm w-[100%] ml-auto text-center"
                  items={["Project 1", "Project 2", "Project 3"]}
                  orientation="horizontal"
                />
              </RadialChart>
            )}
          </AutoSizer>
        </div>
      )}
    </>
  );
};

export default ListerPieChart;
