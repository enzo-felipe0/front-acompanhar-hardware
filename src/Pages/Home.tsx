import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Peca, Categoria, Status } from '../types';

// Dados de exemplo (depois você vai buscar da API)
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

export default function Home() {
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<Categoria>('todas');
  const [statusFiltro, setStatusFiltro] = useState<Status>('todos');

  const navigate = useNavigate();

  // Filtrar peças com base nos critérios
  const pecasFiltradas = useMemo(() => {
    return pecasMock.filter((peca) => {
      const matchBusca = peca.nome.toLowerCase().includes(busca.toLowerCase()) ||
        peca.descricao?.toLowerCase().includes(busca.toLowerCase());
      const matchCategoria = categoriaFiltro === 'todas' || peca.categoria === categoriaFiltro;
      const matchStatus = statusFiltro === 'todos' || peca.status === statusFiltro;

      return matchBusca && matchCategoria && matchStatus;
    });
  }, [busca, categoriaFiltro, statusFiltro]);

  const getStatusColor = (status: Peca['status']) => {
    const colors = {
      'disponivel': 'bg-green-100 text-green-800',
      'enviada': 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  const getStatusLabel = (status: Peca['status']) => {
    const labels = {
      'disponivel': 'Disponível',
      'enviada': 'Enviada',
    };
    return labels[status];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Controle de Peças - TI</h1>
          <p className="text-blue-100 mt-1">Gerenciamento de hardware e equipamentos</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Barra de Busca e Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Campo de Busca */}
            <div className="md:col-span-1">
              <label htmlFor="busca" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar Peça
              </label>
              <input
                id="busca"
                type="text"
                placeholder="Digite o nome da peça..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filtro de Categoria */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                id="categoria"
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value as Categoria)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="todas">Todas</option>
                <option value="computador">Computador</option>
                <option value="notebook">Notebook</option>
                <option value="impressora">Impressora</option>
                <option value="ribbon">Ribbon</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {/* Filtro de Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                value={statusFiltro}
                onChange={(e) => setStatusFiltro(e.target.value as Status)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="todos">Todos</option>
                <option value="disponivel">Disponível</option>
                <option value="enviada">Enviada</option>
              </select>
            </div>
          </div>

          {/* Contador de Resultados */}
          <div className="mt-4 text-sm text-gray-600">
            {pecasFiltradas.length} {pecasFiltradas.length === 1 ? 'peça encontrada' : 'peças encontradas'}
          </div>
        </div>

        {/* Lista de Peças */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pecasFiltradas.map((peca) => (
            <div
              key={peca.id}
              onClick={() => navigate(`/editar/${peca.id}`)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{peca.nome}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(peca.status)}`}>
                  {getStatusLabel(peca.status)}
                </span>
              </div>

              {peca.descricao && (
                <p className="text-sm text-gray-600 mb-4">{peca.descricao}</p>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Categoria:</span>
                  <span className="font-medium text-gray-700 capitalize">{peca.categoria}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Quantidade:</span>
                  <span className="font-medium text-gray-700">{peca.quantidade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {pecasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma peça encontrada com os filtros aplicados.</p>
          </div>
        )}
      </main>
      {/* Botão Flutuante - Adicionar Nova Peça */}
      <button
        onClick={() => navigate('/nova')}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 flex items-center justify-center group z-50"
        aria-label="Adicionar nova peça"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
