export interface HighwayOut {
  id: number;
  name: string;
  type: string;
  km_start: number;
  km_end: number;
  extension: number;
  city: string;
  jurisdiction: string;
  surface: string;
  observation: string;
}

export interface HighwayIn {
  name: string;
  type: string;
  km_start: number;
  km_end: number;
  extension: number;
  city: string;
  jurisdiction: string;
  surface: string;
  observation: string;
}
