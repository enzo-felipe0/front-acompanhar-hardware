import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Peca } from '../types';
import { buscarPeca, atualizarPeca } from '../services/api';

export default function EditarPeca() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [peca, setPeca] = useState<Peca | null>(null);
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState<Peca['categoria']>('computador');
  const [quantidade, setQuantidade] = useState(0);
  const [status, setStatus] = useState<Peca['status']>('disponivel');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    const fetchPeca = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await buscarPeca(id);
        setPeca(data);
        setNome(data.nome);
        setCategoria(data.categoria);
        setQuantidade(data.quantidade);
        setStatus(data.status);
        setDescricao(data.descricao || '');
      } catch (error) {
        console.error('Erro ao buscar peça:', error);
        alert('Erro ao carregar dados da peça');
      } finally {
        setLoading(false);
      }
    };

    fetchPeca();
  }, [id]);

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    try {
      setSalvando(true);
      
      await atualizarPeca(id, {
        nome,
        categoria,
        quantidade,
        status,
        descricao: descricao || undefined,
      });
      
      alert('Peça atualizada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar peça:', error);
      alert('Erro ao atualizar peça');
    } finally {
      setSalvando(false);
    }
  };

  const handleCancelar = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Carregando...</p>
        </div>
      </div>
    );
  }

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

            {/* Status */}
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
                disabled={salvando}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {salvando ? 'Salvando...' : 'Salvar Alterações'}
              </button>
              
              <button
                type="button"
                onClick={handleCancelar}
                disabled={salvando}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:bg-gray-100"
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
