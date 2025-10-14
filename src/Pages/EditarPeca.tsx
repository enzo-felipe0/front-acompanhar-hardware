import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Peca } from '../types';

// Mesmos dados mock (depois vem da API)
const pecasMock: Peca[] = [
  {
    id: '1',
    nome: 'Memória RAM DDR4 8GB',
    categoria: 'computador',
    quantidade: 15,
    status: 'disponivel',
    descricao: 'Memória compatível com Dell/HP'
  },
  {
    id: '2',
    nome: 'SSD 256GB Kingston',
    categoria: 'notebook',
    quantidade: 8,
    status: 'disponivel',
    descricao: 'Para upgrade de notebooks'
  },
  {
    id: '3',
    nome: 'Teclado USB Logitech',
    categoria: 'computador',
    quantidade: 3,
    status: 'enviada',
  },
  {
    id: '4',
    nome: 'Impressora HP LaserJet',
    categoria: 'impressora',
    quantidade: 2,
    status: 'enviada',
  },
  {
    id: '5',
    nome: 'Ribbon Zebra Preto',
    categoria: 'ribbon',
    quantidade: 20,
    status: 'disponivel',
  },
];

export default function EditarPeca() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [peca, setPeca] = useState<Peca | null>(null);
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState<Peca['categoria']>('computador');
  const [quantidade, setQuantidade] = useState(0);
  const [status, setStatus] = useState<Peca['status']>('disponivel');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    // Buscar a peça pelo ID (depois será da API)
    const pecaEncontrada = pecasMock.find(p => p.id === id);
    
    if (pecaEncontrada) {
      setPeca(pecaEncontrada);
      setNome(pecaEncontrada.nome);
      setCategoria(pecaEncontrada.categoria);
      setQuantidade(pecaEncontrada.quantidade);
      setStatus(pecaEncontrada.status);
      setDescricao(pecaEncontrada.descricao || '');
    }
  }, [id]);

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui você faria o PUT/PATCH na API
    const pecaAtualizada: Peca = {
      id: id!,
      nome,
      categoria,
      quantidade,
      status,
      descricao: descricao || undefined,
    };
    
    console.log('Peça atualizada:', pecaAtualizada);
    
    // Mostrar mensagem de sucesso
    alert('Peça atualizada com sucesso!');
    
    // Voltar para a home
    navigate('/');
  };

  const handleCancelar = () => {
    navigate('/');
  };

  if (!peca) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Peça não encontrada</h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Voltar para a lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={handleCancelar}
            className="text-blue-100 hover:text-white mb-2 flex items-center gap-2"
          >
            ← Voltar
          </button>
          <h1 className="text-3xl font-bold">Editar Peça</h1>
          <p className="text-blue-100 mt-1">Atualize as informações da peça</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSalvar} className="space-y-6">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Peça *
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Categoria */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as Peca['categoria'])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="computador">Computador</option>
                <option value="notebook">Notebook</option>
                <option value="impressora">Impressora</option>
                <option value="ribbon">Ribbon</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {/* Quantidade */}
            <div>
              <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade *
              </label>
              <input
                id="quantidade"
                type="number"
                min="0"
                value={quantidade}
                onChange={(e) => setQuantidade(parseInt(e.target.value))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Status - Destaque especial */}
            <div className="border-2 border-blue-200 bg-blue-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Status da Peça *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="disponivel"
                    checked={status === 'disponivel'}
                    onChange={(e) => setStatus(e.target.value as Peca['status'])}
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 font-medium">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    Disponível
                  </span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="enviada"
                    checked={status === 'enviada'}
                    onChange={(e) => setStatus(e.target.value as Peca['status'])}
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 font-medium">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    Enviada
                  </span>
                </label>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição (Opcional)
              </label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Informações adicionais sobre a peça..."
              />
            </div>

            {/* Botões de ação */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Salvar Alterações
              </button>
              
              <button
                type="button"
                onClick={handleCancelar}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
