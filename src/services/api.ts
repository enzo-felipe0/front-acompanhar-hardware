const API_URL = 'http://localhost:3333/api';

export interface Peca {
  id: string;
  nome: string;
  categoria: 'computador' | 'notebook' | 'impressora' | 'ribbon' | 'outro';
  quantidade: number;
  status: 'disponivel' | 'enviada';
  descricao?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Listar todas as peças
export const listarPecas = async (): Promise<Peca[]> => {
  const response = await fetch(`${API_URL}/pecas`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar peças');
  }
  
  return response.json();
};

// Buscar uma peça específica
export const buscarPeca = async (id: string): Promise<Peca> => {
  const response = await fetch(`${API_URL}/pecas/${id}`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar peça');
  }
  
  return response.json();
};

// Criar nova peça
export const criarPeca = async (peca: Omit<Peca, 'id' | 'createdAt' | 'updatedAt'>): Promise<Peca> => {
  const response = await fetch(`${API_URL}/pecas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(peca),
  });
  
  if (!response.ok) {
    throw new Error('Erro ao criar peça');
  }
  
  return response.json();
};

// Atualizar peça
export const atualizarPeca = async (id: string, peca: Omit<Peca, 'id' | 'createdAt' | 'updatedAt'>): Promise<Peca> => {
  const response = await fetch(`${API_URL}/pecas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(peca),
  });
  
  if (!response.ok) {
    throw new Error('Erro ao atualizar peça');
  }
  
  return response.json();
};

// Deletar peça
export const deletarPeca = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/pecas/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Erro ao deletar peça');
  }
};
