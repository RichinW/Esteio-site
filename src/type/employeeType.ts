import { AccountOut } from "./accountType";
import { BranchOut } from "./branchType";
import { DepartamentOut } from "./departamentType";
import { PositionOut } from "./positionType";

export interface EmployeeOut {
  id: number;
  name: string;
  date_of_birth: string;
  date_of_hire?: string;
  cpf: string;
  phone: string;
  phone_contact: string;
  account: AccountOut
  branch?: BranchOut
  departament?: DepartamentOut
  position?: PositionOut
  gender?: string
  address?: string
  blood_type?: string
  medical_condition?: string
  allergy?: string
  regular_medication?: string
  active: boolean
}

export interface EmployeeIn {
  name: string;
  date_of_birth: string;
  date_of_hire?: string;
  cpf: string;
  phone: string;
  phone_contact: string;
  id_account: number | null
  id_branch: number | null
  id_departament: number | null
  id_position: number | null
  gender?: string
  address?: string
  blood_type?: string
  medical_condition?: string
  allergy?: string
  regular_medication?: string
  active?: boolean
}