import { UsuarioResponse } from "./usuarioType";

export interface FuncionarioResponse {
  id: number
  usuario: UsuarioResponse
  dataAdmissao: Date
}

export interface FuncionarioRequest {
  uuid?: string
  cargoId?: number
  dataAdmissao?: Date 
}