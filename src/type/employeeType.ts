import { AccountOut } from "./accountType";

export interface EmployeeOut {
  id: number;
  name: string;
  date_of_birth: string;
  cpf: string;
  phone: string;
  phone_contact: string;
  account: AccountOut
}

export interface EmployeeIn {
  name: string;
  date_of_birth: string;
  cpf: string;
  phone: string;
  phone_contact: string;
  id_account: number | null
}