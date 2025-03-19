import { HighwayOut } from "./highwayType";

export interface RegionalOut {
  id: number;
  name: string;
  observation: string;
  km_start: number;
  km_end: number;
  highways: HighwayOut[];
}

export interface RegionalIn {
  name: string;
  observation: string;
  km_start: number;
  km_end: number;
}
