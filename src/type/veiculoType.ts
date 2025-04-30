export interface VeiculoResponse {
    id: number
    tipo: string
    placa: string
    modelo: string
    marca: string
    anoFabricacao: number
    cor: string
    kmRodado: number
    disponivel: boolean
    ativo: boolean
}

export interface VeiculoRequest {
  tipo?: string
  placa?: string
  modelo?: string
  marca?: string
  anoFabricacao?: number
  cor?: string
  kmRodado?: number
  disponivel?: boolean
  ativo?: boolean
}
