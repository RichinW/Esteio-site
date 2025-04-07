import { RegionalOut } from "./regionalType";
import { TeamOut } from "./teamType";

export interface MissionOut {
  id: number;
  name: string;
  observation: string;
  type: string;
  activity: string;
  audit: number;
  regional: RegionalOut;
  start_date: string;
  end_date: string;
  active: boolean;
  team: TeamOut
}

export interface MissionIn {
  name: string;
  observation: string;
  type: string;
  activity: string;
  audit: number | null;
  id_regional: number | null;
  start_date: string;
  end_date: string;
  active?: boolean;
  id_team: number | null
}