import { EmployeeOut } from "./employeeType";

export interface TeamOut {
    id: number;
    employee_one: EmployeeOut;
    employee_two?: EmployeeOut;
    date_register: string
  }
  
  export interface TeamIn {
    employee_one: number | null;
    employee_two: number| null;
    date_register?: string
  }