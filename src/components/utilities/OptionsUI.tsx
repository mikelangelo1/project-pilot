import { NextPage } from "next";
import { BulbOutlined, PlusOutlined } from "@ant-design/icons";
import { Option } from "../../models/utilities";

interface OptionsPropType {
  options: Option[];
  // eslint-disable-next-line no-unused-vars
  select: (param: Option) => void;
  selected: Option | null;
}

const OptionsUI: NextPage<OptionsPropType> = ({
  options,
  select,
  selected,
}) => (
  <div className="flex flex-col text-left gap-y-2">
    {options.length &&
      options.map((option) => (
        <button
          type="button"
          onClick={() => select(option)}
          className={`flex items-center shadow-1 ${
            selected && selected.value === option.value
              ? "border border-tertiary-mid"
              : ""
          } h-[80px] bg-secondary-high px-5 rounded-md py-3 w-[350px] gap-x-4 hover:border hover:border-tertiary-mid`}
          key={option.title}
        >
          {option.icon === "pluscircleoutlined" && (
            <PlusOutlined className="text-tertiary-high rounded-2xl p-2 bg-tertiary-low" />
          )}
          {option.icon === "bulboutlined" && (
            <BulbOutlined className="text-tertiary-high rounded-2xl p-2 bg-tertiary-low" />
          )}

          <p className="flex flex-col text-xs text-left">
            <span className="font-black">{option.title}</span>
            <small>{option.description}</small>
          </p>
        </button>
      ))}
  </div>
);

export default OptionsUI;
