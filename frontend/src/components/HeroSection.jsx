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
      <div className="bg-white border border-gray-200 rounded-lg flex flex-col lg:flex-row overflow-hidden shadow-sm">
        
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 p-3">
          <ul className="space-y-1">
            {categories.map((category, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    index === 0 ? 'bg-blue-50 text-gray-800' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Main Banner */}
          <div className="md:col-span-3 bg-gradient-to-br from-cyan-100 to-blue-300 rounded-lg p-8 relative overflow-hidden flex flex-col justify-center items-start min-h-[300px]">
            <div className="z-10 max-w-[60%]">
              <h2 className="text-xl md:text-2xl text-blue-800 font-medium mb-1">New trending</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Electronic items</h3>
              <button className="bg-white text-gray-800 font-medium px-6 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                Learn more &gt;
              </button>
            </div>
            {/* Placeholder for phone image */}
            <div className="absolute right-0 bottom-0 w-[40%] h-full opacity-60 bg-blue-400 mix-blend-multiply rounded-br-lg" style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1598327105666-5b89351cb31b?q=80&w=600&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'normal',
              opacity: 1
            }}></div>
          </div>

          {/* Side Banners (stacked vertically if more than one, mockup has one big one or two small ones? The mockup has one tall banner and below it two small boxes. Ah wait, looking closely at the mockup:
          Right side: Top box "User profile" (Avatar, Welcome, Join/Log in buttons).
          Wait, no. The right side has a tall banner "Get US $10 off with new supplier" with a guy.
          Actually, I see two distinct images? No, one tall image.
          Wait, usually these templates have 1 tall or 2 small. Let's make 1 tall banner to match the image precisely.
          */}
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
