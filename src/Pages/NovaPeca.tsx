import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Peca } from '../types';
import { criarPeca } from '../services/api';

export default function NovaPeca() {
  const navigate = useNavigate();
  
  const [salvando, setSalvando] = useState(false);
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState<Peca['categoria']>('computador');
  const [quantidade, setQuantidade] = useState(1);
  const [status, setStatus] = useState<Peca['status']>('disponivel');
  const [descricao, setDescricao] = useState('');

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSalvando(true);
      
      await criarPeca({
        nome,
        categoria,
        quantidade,
        status,
        descricao: descricao || undefined,
      });
      
      alert('Peça cadastrada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar peça:', error);
      alert('Erro ao cadastrar peça');
    } finally {
      setSalvando(false);
    }
  };

  const handleCancelar = () => {
    navigate('/');
  };

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
          <h1 className="text-3xl font-bold">Nova Peça</h1>
          <p className="text-blue-100 mt-1">Cadastre uma nova peça no estoque</p>
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
                placeholder="Ex: Memória RAM DDR4 8GB"
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
                min="1"
                value={quantidade}
                onChange={(e) => setQuantidade(parseInt(e.target.value))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Status */}
            <div className="border-2 border-blue-200 bg-blue-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Status Inicial *
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
                {salvando ? 'Cadastrando...' : 'Cadastrar Peça'}
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
