
export interface UsuarioResponse {
  id: string;
  username: string,
  email: string;
  firstName: string
  lastName: string
  emailVerified: boolean
  createdTimestamp: number
  enabled: boolean
  requiredActions: string[]
  attributes: { [key: string]: string[] }  
}

export interface UsuarioRequest {
  username?: string,
  enabled?: boolean
  email?: string;
  firstName?: string
  lastName?: string
  password?: string
  temporaryPassword?: boolean
  alergias: string[]
  nomeCompleto?: string
  cpf?: string
  telefone?: string
  telefoneEmergencia?: string
  tipoSanguineo?: string
  medicacaoConstante?: string
  portadorDoencas?: string[]
  ativo?: string
}