import { FC } from "react";
import { ButtonDefaultProps } from "@/type/types";

const ButtonDefault: FC<ButtonDefaultProps> = ({
  text,
  icone,
  bgColor,
  color,
  onClick,
  disabled,
  width,
  height,
  fontSize
}) => {
  return (
    <div
      className={`${bgColor} ${width} ${height} rounded-md flex justify-center items-center`}
    >
      <input type="submit" value={text} className={`${color} w-full h-full ${fontSize}`} onClick={onClick} />
      {icone && <i className={`${icone}`}></i>}
    </div>
  );
};

export default ButtonDefault;
