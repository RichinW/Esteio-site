import { CampoProducaoResponse } from "./campoProducaoType"

export interface TipoProducaoResponse {
  id: number
  nome: string
  descricao: string
  campos: CampoProducaoResponse[]
  ativo: boolean
}

export interface TipoProducaoRequest {
  nome?: string
  descricao?: string
  ativo?: boolean
}
