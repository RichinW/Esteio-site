import { HighwayOut } from "../highwayType";
import { EmployeeOut } from "../employeeType";
import { AccountOut } from "../accountType";
import { RegionalOut } from "../regionalType";

export interface PhotoVerticalOut {
  id: number;
  state_vs_id: number;
  photo_url: string;
  photo_type?: string;
}

export interface VerticalOut {
  id: number;
  highway: HighwayOut;
  regional: RegionalOut
  km: number
  latitude: number;
  longitude: number;
  sense: string;
  side: string;
  date_register: string;
  account_register: AccountOut;
  board_type: string;
  sheet_material: string;
  type_of_support: string;
  plate_code: string;
}

export interface StateVerticalOut {
  id: number;
  audit: number;
  height: number;
  board_distance: number;
  protective_device: boolean;
  state_of_conservation: string;
  manufacturing_date: string;
  conservation_observation: string;
  format: string;
  board_width: number;
  board_height: number;
  observation?: string;
  photos: PhotoVerticalOut[];
  employees: EmployeeOut[];
}
