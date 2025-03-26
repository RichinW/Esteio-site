import { SelectDefaultProps } from "@/type/types";
import { FC, useState } from "react";
import Select from "react-select";

const SelectDefault: FC<SelectDefaultProps> = ({
  options,
  placeholder,
  value,
  onChange,
  width
}) => {
  const selectedOption =
    options.find((option) => option.value === value) || null;

  const customStyle = {
    control: (base: any) => ({
      ...base,
      height: 46,
      backgroundColor: "#ffffff", // Altera o fundo do select
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)", // Adiciona a sombra
      borderColor: "transparent", // Altera a cor da borda
      "&:hover": {
        borderColor: "", // Altera a cor da borda ao passar o mouse
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#ffffff", // Altera o fundo do menu de opções
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)", // Sombra para o menu de opções
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#4CAF50"
        : state.isFocused
        ? "#e2e8f0"
        : "#ffffff", // Cor de fundo da opção (ao passar o mouse ou selecionada)
      color: state.isSelected ? "#fff" : "#000", // Cor do texto da opção (branca quando selecionada)
    }),
  };

  const customDefaut = {
    control: (base: any) => ({
      ...base,
      height: 64,
      backgroundColor: "##f3f4f6", // Altera o fundo do select
      borderColor: "#ccc", // Altera a cor da borda
      "&:hover": {
        borderColor: "#aaa", // Altera a cor da borda ao passar o mouse
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#ffffff", // Altera o fundo do menu de opções
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#4CAF50"
        : state.isFocused
        ? "#e2e8f0"
        : "#ffffff", // Cor de fundo da opção (ao passar o mouse ou selecionada)
      color: state.isSelected ? "#fff" : "#000", // Cor do texto da opção (branca quando selecionada)
    }),
  };

  return (
    <div className={`w-${width} bg-gray-100`}>
      <Select
        options={options}
        value={selectedOption} 
        onChange={(selected) => onChange(selected)}
        styles={customStyle}
        placeholder={placeholder}
        getOptionLabel={(e) => e.label}
        getOptionValue={(e) => e.value}
      />
    </div>
  );
};

export default SelectDefault;
