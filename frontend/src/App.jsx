import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Package } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utiliza useEffect para buscar os produtos apenas na primeira renderização (montagem do componente)
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Define o estado de carregamento como verdadeiro antes de iniciar a requisição
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      
      // O Laravel retorna os dados paginados dentro da propriedade 'data'
      // Verificamos a estrutura da resposta para garantir compatibilidade e evitar quebras de renderização
      const productsArray = response.data.data ? response.data.data : response.data;
      setProducts(Array.isArray(productsArray) ? productsArray : []);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      setError('Não foi possível carregar os produtos no momento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Package size={24} />
            <h1 className="text-xl font-bold">CloudMarket</h1>
          </div>
          <div>
            <button className="flex items-center gap-2 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              <ShoppingCart size={20} />
              <span>Carrinho</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Nossos Produtos</h2>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center py-12">Nenhum produto cadastrado ainda.</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-bold text-blue-600">
                        R$ {Number(product.price).toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Estoque: {product.stock}
                      </span>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 rounded-lg transition-colors">
                      Comprar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
