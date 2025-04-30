export interface TrechoResponse{
    id: number
    codigo: string
    tipo: string
    municipio: string
    kmInicio: number
    kmFim: number
    extensao: number
    jurisdicao: string
    administracao: string
    superficie: string
    localizacao: number[]
    observacao: string
    ativo: boolean
}

export interface TrechoRequest{
    codigo?: string
    tipo?: string
    municipio?: string
    kmInicio?: number
    kmFim?: number
    jurisdicao?: string
    administracao?: string
    superficie?: string
    localizacao?: number[]
    observacao?: string
    regionalId?: number
    rodoviaId?: number
    ativo?: boolean
}