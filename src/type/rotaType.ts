import { RegionalResponse } from "./regionalType";
import { TrechoResponse } from "./trechoType";
import { EquipeResponse } from "./equipeType";
import { CartaoResponse } from "./cartaoType";
import { VeiculoResponse } from "./veiculoType";

export interface RotaResponse {
  id: number;
  auditoria: string
  dataIda: Date
  dataVolta: Date
  equipe: EquipeResponse
  regional: RegionalResponse
  cartao: CartaoResponse
  veiculo: VeiculoResponse
  trechos: TrechoResponse[]
  ativo: boolean
}

export interface RotaRequest {
  equipeId?: number
  regionalId?: number
  veiculoId?: number
  cartaoId?: number
  trechosIds?: number[]
  auditoria?: string
  dataIda?: Date
  dataVolta?: Date
  ativo?: boolean
}