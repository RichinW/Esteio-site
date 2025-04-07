import { MissionOut } from "./missionType";
import { HighwayOut } from "./highwayType";
import { Status } from "./enumsType";

export interface ProductionOut {
  id: number;
  date: string;
  mission: MissionOut;
  highway: HighwayOut;
  km_start: number;
  km_end: number;
  extension: number;
  total_elements: number;
  state_highway: string;
  observation?: string;
  verification_status?: Status;
  verification_observation?: string;
}

export interface EditModalProductionProps {
  edit_production: ProductionOut;
}
