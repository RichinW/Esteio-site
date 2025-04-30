import { FuncionarioResponse } from "./funcionarioType";

export interface EquipeResponse {
    id: number;
    funcionarios: FuncionarioResponse[]
    dataCriacao: Date
    ativo: boolean
  }
  
  export interface EquipeRequest {
    funcionariosIds?: number[]
    dataCriacao?: Date
    ativo?: boolean
  }