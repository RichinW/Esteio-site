import { TrechoResponse } from "./trechoType";

export interface RegionalResponse {
  id: number
  nome: string
  trechos: TrechoResponse[]
  ativo: boolean
}

export interface RegionalRequest {
  nome?: string
  trechosIds: number[]
  ativo?: boolean
}
