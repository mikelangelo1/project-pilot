import React, { MouseEventHandler } from "react";
import { Button } from "antd";
import Image from "next/image";
import imageLoader from "../../lib/helperFunctions/loader";

interface Props {
  htmlType: "button" | "submit" | "reset" | undefined;
  width?: string;
  color?: string;
  children: React.ReactChild;
  disabled?: boolean;
  icon?: string;
  onClickTrigger?: MouseEventHandler<HTMLButtonElement> | undefined;
  bg?: string;
  className?: string
}

export default function ButtonUI({
  width,
  htmlType,
  icon,
  color,
  bg,
  disabled,
  onClickTrigger,
  children,
  className,
}: Props) {
  return (
    <Button
      disabled={disabled}
      htmlType={htmlType}
      onClick={onClickTrigger}
      className={`
      ${width ? `w-[${width}]` : "w-100%"} 
      ${color ? `text-${color}` : "text-secondary-high"}
      ${bg ? `bg-${bg}` : "bg-tertiary-high"}
      ${disabled ? "opacity-20" : "opacity-100"}
      ${icon ? "flex gap-x-2 justify-center items-center" : ""}
      opacity-90
      hover:opacity-100
      ${color ? `hover:text-${color}` : "hover:text-secondary-high"}
      ${bg ? `hover:bg-${bg}` : "hover:bg-tertiary-high"}
       px-3
       
      h-[45px]
      rounded-l
      ${className}
      `}
    >
      {icon && (
        <Image
          unoptimized={true}
          loader={imageLoader}
          src={`/assets/icons/${icon}`}
          height={15}
          width={15}
          alt={`${icon?.split(".")[0] ? icon?.split(".")[0] : icon}`}
        />
      )}
      <span>{children}</span>
    </Button>
  );
}
