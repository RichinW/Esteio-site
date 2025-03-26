
export interface InputTextProps {
  placeholder: string;
  width: string;
  icone?: string;
  input: string;
  type: string;
  onClick?: () => void;
  setInput: (value: string) => void;
}

export interface ButtonDefaultProps {
  text: string;
  icone?: string;
  disabled?: boolean,
  bgColor: string;
  color?: string;
  onClick: () => void;
}

export interface FilterIn {
  date: string
  audit: number | null
  activity: string
  type: string
  regional: string
  highway: string
}

export interface SelectDefaultProps {
  options: any[]
  placeholder?: string
  value?: string | number | null
  onChange: any
  width: string
}