export interface CartaoResponse {
  id: number;
  tipo: string;
  numero: string;
  dataValidade: string;
  banco: string;
  cvc: string;
  disponivel: boolean;
  ativo: boolean;
}

export interface CartaoRequest {
  tipo?: string;
  numero?: string;
  dataValidade?: string;
  banco?: string;
  cvc?: string;
  disponivel?: boolean;
  ativo?: boolean;
}
