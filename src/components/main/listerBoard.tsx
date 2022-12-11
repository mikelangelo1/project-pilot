import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
// import { useLoading } from "../../context/loadingCtx";
import { listerDummy } from "../../lib/common/listerBoard";
import numberWithCommas from "../../lib/helperFunctions/numberWithComma";
import { ListerBoard as ListerBoardType } from "../../models/listers";

const ListerBoard = () => {
  //   const { loading } = useLoading();
  const [boardDetails, setBoardDetails] =
    useState<ListerBoardType[]>(listerDummy);

  const [showTable] = useState<boolean>(false);

  useEffect(() => {
    setBoardDetails(listerDummy);
  }, []);

  return (
    <div className="px-5 py-2 my-4 boxProps2">
      <h3 className="opacity-60 my-2 ml-4 text-sm">Project Views</h3>
      <div className="flex items-center justify-between gap-x-4 p-3 overflow-x-scroll">
        {boardDetails &&
          boardDetails.map((board, index) => (
            <div className=" flex items-center" key={board.title}>
              {index !== 0 && (
                <div className="border-l border-primary-high h-[40px] opacity-40 px-6"></div>
              )}
              <div className="px-2">
                <h4 className="whitespace-nowrap text-xs">{board.title}</h4>
                <p className="flex items-center flex-nowrap">
                  <span className="text-lg">
                    {showTable && numberWithCommas(board.value)}
                    {!showTable && 0}
                  </span>
                  {showTable && (
                    <span
                      className={`${board.direction === "up" && "text-success"}
                  ${
                    board.direction === "down" && "text-error"
                  } flex items-center -mb-2 ml-2 flex-nowrap text-xs`}
                    >
                      {board.direction === "up" && <ArrowUpOutlined />}
                      {board.direction === "down" && <ArrowDownOutlined />}
                      <span className="ml-1">{board.subValue}</span>
                      <span>%</span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListerBoard;
