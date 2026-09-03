import React from 'react';

const CategoryBlock = ({ title, buttonText, bannerImage, products }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4 font-sans">
      {/* Contêiner principal do bloco de categorias */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg flex flex-col lg:flex-row overflow-hidden shadow-sm">
        
        {/* Bloco de banner lateral com imagem */}
        <div className="w-full lg:w-64 flex-shrink-0 p-6 relative overflow-hidden h-48 lg:h-auto min-h-[240px]">
          {/* Imagem de fundo */}
          <div 
            className="absolute inset-0 z-0 opacity-80 dark:opacity-60" 
            style={{
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          {/* Conteúdo do texto no banner */}
          <div className="relative z-10 w-2/3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{title}</h3>
            <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium px-4 py-2 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {buttonText} &gt;
            </button>
          </div>
        </div>

        {/* Grade de exibição dos produtos */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-gray-200 dark:divide-gray-800">
          {products.map((product) => (
            <div key={product.id} className="p-4 h-32 flex flex-col justify-between relative cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="z-10">
                <h4 className="text-gray-800 dark:text-gray-200 text-sm font-medium line-clamp-1">{product.name}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">From USD {product.price}</p>
              </div>
              
              <div className="absolute bottom-2 right-2 w-16 h-16 flex items-end justify-end">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal rounded-md" />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryBlock;
