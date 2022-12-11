/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import { NextPage } from "next";
import { RangeValue } from "rc-picker/lib/interface";
import { ListerLink } from "../../models/link";

interface ListerBreadNavType {
  // eslint-disable-next-line no-unused-vars
  links: ListerLink[];
  goTo: (param: string) => void;
  showDate: boolean;
}

const { RangePicker } = DatePicker;

const ListerBreadnav: NextPage<ListerBreadNavType> = ({
  links,
  goTo,
  showDate,
}) => {
  const onChange = (dates: RangeValue<Moment>, dateStrings: any[]) => {
    if (!dates || !dates.length) return;
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  };

  return (
    <div className="flex flex-wrap gap-y-2 my-2 justify-between items-center">
      <nav className="flex items-center gap-x-5 duration-400">
        {links.map((link) => (
          <button
            key={link.link}
            className={`${link.active && "boxProps"}
            duration-400 transition-all p-2 px-4 rounded`}
            type="button"
            onClick={() => goTo(link.link)}
          >
            {link.title}
          </button>
        ))}
      </nav>
      {showDate && (
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default ListerBreadnav;
