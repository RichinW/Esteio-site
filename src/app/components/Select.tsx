import { SelectDefaultProps } from "@/type/types";
import { FC, useState } from "react";
import Select from "react-select";

const SelectDefault: FC<SelectDefaultProps> = ({ options, placeholder, value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selected: any) => {
    setSelectedOption(selected);
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 64,
      backgroundColor: '##f3f4f6',  // Altera o fundo do select
      borderColor: '#ccc',         // Altera a cor da borda
      '&:hover': {
        borderColor: '#aaa'        // Altera a cor da borda ao passar o mouse
      }
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: '#ffffff',  // Altera o fundo do menu de opções
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? '#4CAF50' : state.isFocused ? '#e2e8f0' : '#ffffff',  // Cor de fundo da opção (ao passar o mouse ou selecionada)
      color: state.isSelected ? '#fff' : '#000',  // Cor do texto da opção (branca quando selecionada)
    }),
  };

  return (
    <div className="w-full bg-gray-100">
      <Select
        className="bg-gray-100"
        options={options}
        value={value}
        onChange={onChange}
        styles={customStyles}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SelectDefault;
