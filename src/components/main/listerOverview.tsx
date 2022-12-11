import ListerAreaChart from "./listerAreaChart";
import ListerBoard from "./listerBoard";
import ListerPieChart from "./listerPieChart";
import ListerRecentActivity from "./listerRecentActivity";
import OffsetterTable from "./offsetter";

const ListerOverview = () => (
  <div className="mt-10">
    <ListerBoard />
    <div className="flex items-start flex-wrap gap-y-4 gap-x-2  justify-between">
      <div className="bg-secondary-high p-4 pb-5 w-[100%] lg:w-[60%] boxProps2 ">
        <ListerAreaChart />
      </div>
      <div className="bg-secondary-high p-4 pb-[60px] w-[100%] lg:w-[37%] xl:w-[38%] boxProps2">
        <ListerPieChart />
      </div>
      <div className="flex items-start flex-wrap gap-4 gap-x-2 w-[100%] justify-between">
        <div className="w-[100%] lg:w-[55%] xl:w-[60%] boxProps2 p-6">
          <OffsetterTable />
        </div>
        <div className="w-[100%]  lg:w-[43%] xl:w-[38%] boxProps2 p-6 px-3">
          <ListerRecentActivity />
        </div>
      </div>
    </div>
  </div>
);

export default ListerOverview;
