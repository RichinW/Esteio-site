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
  fontSize,
  hover
}) => {
  return (
    <div
      className={`${bgColor} ${disabled ? ' opacity-70' : `${hover}`} ${width} ${height} rounded-md flex justify-center items-center transition-all`}
    >
      <input type="submit" value={text} className={`${color} w-full h-full ${fontSize}`} onClick={onClick} disabled={disabled} />
      {icone && <i className={`${icone}`}></i>}
    </div>
  );
};

export default ButtonDefault;
