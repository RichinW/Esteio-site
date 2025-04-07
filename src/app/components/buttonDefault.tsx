import { FC } from "react";
import { ButtonDefaultProps } from "@/type/types";

const ButtonDefault: FC<ButtonDefaultProps> = ({
  text,
  icone,
  bgColor,
  color,
  onClick,
  disabled
}) => {
  return (
    <div
      className={`${bgColor} w-96 h-16 rounded-md flex justify-center items-center`}
    >
      <input type="submit" value={text} className={`${color} w-full h-full text-xl`} onClick={onClick} />
      {icone && <i className={`${icone}`}></i>}
    </div>
  );
};

export default ButtonDefault;
