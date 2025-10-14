export interface Peca {
  id: string;
  nome: string;
  categoria: 'computador' | 'notebook' | 'impressora' | 'ribbon' | 'outro';
  quantidade: number;
  status: 'disponivel' | 'enviada';
  descricao?: string;
}

export type Categoria = Peca['categoria'] | 'todas';
export type Status = Peca['status'] | 'todos';
