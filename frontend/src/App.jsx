import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DealsSection from './components/DealsSection';
import CategoryBlock from './components/CategoryBlock';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      
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

  // Mapeia os primeiros 12 produtos recebidos da API para o bloco "Home and outdoor products"
  const apiHomeProductsMapped = products.slice(0, 12).map(p => ({
    id: p.id,
    name: p.name,
    price: Number(p.price).toFixed(0),
    image: p.image // Agora a API suporta retornar a imagem
  }));

  // Completar com dados simulados caso a API retorne menos de 12 itens
  const homeProducts = apiHomeProductsMapped.length === 12 ? apiHomeProductsMapped : [
    ...apiHomeProductsMapped,
    ...Array(12 - apiHomeProductsMapped.length).fill(0).map((_, i) => ({
      id: `mock-home-${i}`,
      name: 'Product pending',
      price: '99',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=150&auto=format&fit=crop'
    }))
  ];

  // Mapeia os produtos a partir do índice 12 da API para o bloco "Consumer electronics and gadgets"
  const apiElectronicsMapped = products.slice(12, 20).map(p => ({
    id: p.id,
    name: p.name,
    price: Number(p.price).toFixed(0),
    image: p.image
  }));

  // Completar com dados simulados caso a API retorne menos itens para não quebrar o layout
  const electronicsProducts = apiElectronicsMapped.length === 8 ? apiElectronicsMapped : [
    ...apiElectronicsMapped,
    ...Array(8 - apiElectronicsMapped.length).fill(0).map((_, i) => ({
      id: `mock-elec-${i}`,
      name: 'Product from API pending',
      price: '99',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf6d173cdea?q=80&w=150&auto=format&fit=crop'
    }))
  ];

  // Retorna a estrutura principal da aplicação, aplicando as classes de cor do tema
  return (
    <div className="min-h-screen bg-gray-300 dark:bg-black font-sans pb-12 transition-colors duration-200">
      <Header />
      
      <main>
        <HeroSection />
        
        <DealsSection />
        
        <CategoryBlock 
          title="Home and outdoor products"
          buttonText="Explore all"
          bannerImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=300&auto=format&fit=crop"
          products={homeProducts}
        />

        <CategoryBlock 
          title="Consumer electronics and gadgets"
          buttonText="Explore all"
          bannerImage="https://images.unsplash.com/photo-1550009158-9ebf6d173cdea?q=80&w=300&auto=format&fit=crop"
          products={electronicsProducts}
        />

        {/* Bloco que exibe os produtos diretamente da API, mantido para evitar problemas de exibição */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors">Todos os Produtos (API)</h2>
          
          {loading && (
            <div className="flex justify-center items-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {products.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center py-8">Nenhum produto cadastrado.</p>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                    <div>
                      {/* Exibe a imagem caso a API retorne */}
                      <div className="h-32 mb-3 flex items-center justify-center">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal rounded-md" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm line-clamp-2">{product.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-bold mt-2">
                        R$ {Number(product.price).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 mt-2">Estoque: {product.stock}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
