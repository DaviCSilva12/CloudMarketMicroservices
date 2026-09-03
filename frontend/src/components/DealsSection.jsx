import React from 'react';

const DealsSection = () => {
  const deals = [
    { id: 1, name: 'Smart watch', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=200&auto=format&fit=crop', discount: '-25%' },
    { id: 2, name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&auto=format&fit=crop', discount: '-15%' },
    { id: 3, name: 'GoPro cameras', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=200&auto=format&fit=crop', discount: '-40%' },
    { id: 4, name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop', discount: '-25%' },
    { id: 5, name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop', discount: '-25%' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-4 font-sans">
      {/* Contêiner da seção de ofertas suportando dark mode */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg flex flex-col lg:flex-row overflow-hidden shadow-sm">
        
        {/* Bloco do Cronômetro de Ofertas */}
        <div className="w-full lg:w-64 flex-shrink-0 p-6 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Deals and offers</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Hygiene equipments</p>
          
          <div className="flex gap-2">
            <div className="bg-gray-800 dark:bg-gray-700 text-white rounded p-2 text-center w-12">
              <div className="font-bold text-lg leading-none">04</div>
              <div className="text-[10px] mt-1 text-gray-300">Days</div>
            </div>
            <div className="bg-gray-800 dark:bg-gray-700 text-white rounded p-2 text-center w-12">
              <div className="font-bold text-lg leading-none">13</div>
              <div className="text-[10px] mt-1 text-gray-300">Hour</div>
            </div>
            <div className="bg-gray-800 dark:bg-gray-700 text-white rounded p-2 text-center w-12">
              <div className="font-bold text-lg leading-none">34</div>
              <div className="text-[10px] mt-1 text-gray-300">Min</div>
            </div>
            <div className="bg-gray-800 dark:bg-gray-700 text-white rounded p-2 text-center w-12">
              <div className="font-bold text-lg leading-none">56</div>
              <div className="text-[10px] mt-1 text-gray-300">Sec</div>
            </div>
          </div>
        </div>

        {/* Grade de Produtos em Oferta */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-gray-200 dark:divide-gray-800">
          {deals.map((deal) => (
            <div key={deal.id} className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="h-32 w-32 mb-4 flex items-center justify-center">
                <img src={deal.image} alt={deal.name} className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal rounded-md" />
              </div>
              <h4 className="text-gray-800 dark:text-gray-200 text-sm mb-2 text-center">{deal.name}</h4>
              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                {deal.discount}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DealsSection;
