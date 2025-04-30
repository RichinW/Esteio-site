import { RotaResponse } from "./rotaType";
import { TipoProducaoResponse } from "./tipoProducaoType";
import { TrechoResponse } from "./trechoType";

export interface ProducaoResponse {
  id: number;
  rota: RotaResponse
  trecho: TrechoResponse
  tipoProducao: TipoProducaoResponse
  dados: { [key: string]: string }
  dataCadastro: Date
  ativo: boolean
}

export interface ProducaoRequest {
  rotaId?: number,
  trechoId?: number,
  tipoProducaoId?: number
  dados?: { [key: string]: string }
  ativo?: boolean
}
