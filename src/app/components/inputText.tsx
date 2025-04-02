import { InputTextProps } from "@/type/types";
import { FC } from "react";

const InputText: FC<InputTextProps> = ({
  placeholder,
  icone,
  type,
  input,
  setInput,
  width,
  height,
  fontSize,
  onClick
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    
  };
  return (
    <div className={`${width} ${height} bg-gray-100 rounded-md p-4 flex justify-center items-center gap-2`}>
      <input
        className={`bg-transparent focus:outline-none w-full h-full text-gray-600 ${fontSize} placeholder:text-gray-400`}
        placeholder={placeholder}
        value={input === null ? '': input}
        onChange={handleInputChange}
        type={type}
      />
      <i className={`${icone} text-3xl text-gray-600 transition-all`} onClick={onClick}></i>
    </div>
  );
};

export default InputText;
