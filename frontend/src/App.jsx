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

  // Dados mockados (simulados) para o primeiro bloco de produtos na tela inicial
  const homeProducts = [
    { id: 1, name: 'Soft chairs', price: '19', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=150&auto=format&fit=crop' },
    { id: 2, name: 'Sofa & chair', price: '19', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=150&auto=format&fit=crop' },
    { id: 3, name: 'Kitchen mixer', price: '100', image: 'https://images.unsplash.com/photo-1593998066526-65fcab3021a2?q=80&w=150&auto=format&fit=crop' },
    { id: 4, name: 'Smart watches', price: '19', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=150&auto=format&fit=crop' },
    { id: 5, name: 'Coffee maker', price: '10', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=150&auto=format&fit=crop' },
    { id: 6, name: 'Home appliance', price: '90', image: 'https://images.unsplash.com/photo-1585223199586-a3bd8d23469b?q=80&w=150&auto=format&fit=crop' },
    { id: 7, name: 'Plant pot', price: '19', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=150&auto=format&fit=crop' },
    { id: 8, name: 'Sofa & chair', price: '19', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=150&auto=format&fit=crop' },
    // Adicionando novos itens para compra como solicitado
    { id: 9, name: 'Dining Table', price: '150', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=150&auto=format&fit=crop' },
    { id: 10, name: 'Modern Lamp', price: '45', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=150&auto=format&fit=crop' },
    { id: 11, name: 'Wall Clock', price: '25', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=150&auto=format&fit=crop' },
    { id: 12, name: 'Bookshelf', price: '85', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=150&auto=format&fit=crop' }
  ];

  // Mapear produtos recebidos da API para o formato esperado pelo CategoryBlock
  const apiProductsMapped = products.slice(0, 8).map(p => ({
    id: p.id,
    name: p.name,
    price: Number(p.price).toFixed(0),
    image: null // A API não fornece imagem por padrão, então deixamos nulo
  }));

  // Completar com dados simulados caso a API retorne menos de 8 itens para não quebrar o layout
  const electronicsProducts = apiProductsMapped.length === 8 ? apiProductsMapped : [
    ...apiProductsMapped,
    ...Array(8 - apiProductsMapped.length).fill(0).map((_, i) => ({
      id: `mock-${i}`,
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
