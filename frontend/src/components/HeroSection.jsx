import React from 'react';

const HeroSection = () => {
  const categories = [
    "Automobiles",
    "Home appliance",
    "Tools, equipments",
    "Books & magazines",
    "Electronic gadgets",
    "Clothing and wear",
    "Sports and outdoor",
    "More category"
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-4 font-sans">
      {/* Contêiner do Hero Section com bordas e fundo suportando modo escuro */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg flex flex-col lg:flex-row overflow-hidden shadow-sm">
        
        {/* Menu de navegação lateral (Sidebar) */}
        <div className="w-full lg:w-64 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 p-3">
          <ul className="space-y-1">
            {categories.map((category, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    index === 0 ? 'bg-blue-50 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Área principal de conteúdo (Banners) */}
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Banner Principal de destaque */}
          <div className="md:col-span-3 bg-gradient-to-br from-cyan-100 to-blue-300 dark:from-cyan-900/40 dark:to-blue-900/40 rounded-lg p-8 relative overflow-hidden flex flex-col justify-center items-start min-h-[300px]">
            <div className="z-10 max-w-[60%]">
              <h2 className="text-xl md:text-2xl text-blue-800 dark:text-blue-300 font-medium mb-1">New trending</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">Electronic items</h3>
              <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium px-6 py-2 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Learn more &gt;
              </button>
            </div>
            {/* Imagem decorativa de fundo do banner */}
            <div className="absolute right-0 bottom-0 w-[40%] h-full opacity-60 bg-blue-400 mix-blend-multiply dark:mix-blend-normal rounded-br-lg" style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1598327105666-5b89351cb31b?q=80&w=600&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 1
            }}></div>
          </div>

          {/* Banner Lateral de oferta */}
          <div className="md:col-span-1 rounded-lg relative overflow-hidden flex flex-col justify-start items-center p-4 text-center min-h-[300px]" style={{
            backgroundColor: '#2e4369',
            backgroundImage: 'url("https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=400&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'top center'
          }}>
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 mt-4">
              <h4 className="text-white text-lg font-medium leading-snug">Get US $10 off with<br/>new supplier</h4>
              <button className="mt-4 bg-transparent border border-white text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                Get offer
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
