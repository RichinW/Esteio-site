export interface CampoProducaoResponse {
    id: number
    nome: string
    label: string
    tipo: string
    obrigatorio: boolean
    opcoes: string
    ativo: boolean
}

export interface CampoProducaoRequest {
    nome?: string
    label?: string
    tipo?: string
    obrigatorio?: boolean
    opcoes?: string
    tipoProducaoId?: number
    ativo?: boolean
}