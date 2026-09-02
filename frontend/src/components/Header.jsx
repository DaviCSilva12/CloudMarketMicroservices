import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, ChevronDown, Package, Box, Sun, Moon } from 'lucide-react';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Efeito para adicionar ou remover a classe 'dark' do elemento html
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 font-sans transition-colors duration-200">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-blue-600 p-1.5 rounded-md">
            <Package size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">Brandname</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:flex border-2 border-blue-600 rounded-lg overflow-hidden h-10">
          <input 
            type="text" 
            placeholder="Search" 
            className="flex-1 px-4 outline-none text-gray-700 dark:text-gray-200 dark:bg-gray-800"
          />
          <div className="border-l border-gray-300 dark:border-gray-700 flex items-center px-3 bg-gray-50 dark:bg-gray-800 cursor-pointer">
            <span className="text-sm text-gray-600 dark:text-gray-300">All category</span>
            <ChevronDown size={16} className="text-gray-500 dark:text-gray-400 ml-1" />
          </div>
          <button className="bg-blue-600 text-white px-6 font-medium hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors bg-gray-100 dark:bg-gray-800 p-2 rounded-full"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
          </button>
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors">
            <Box size={22} />
            <span className="text-[10px] mt-1 font-medium">Orders</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors">
            <Heart size={22} />
            <span className="text-[10px] mt-1 font-medium">Saved</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors relative">
            <ShoppingCart size={22} />
            <span className="text-[10px] mt-1 font-medium">My cart</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors">
            <User size={22} />
            <span className="text-[10px] mt-1 font-medium">Sign in</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-12 flex justify-between items-center text-sm font-medium">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-blue-600">
              <Menu size={20} />
              <span>All category</span>
            </button>
            <nav className="hidden md:flex gap-6 text-gray-600">
              <a href="#" className="hover:text-blue-600">Hot offers</a>
              <a href="#" className="hover:text-blue-600">Services</a>
              <a href="#" className="hover:text-blue-600">Bestsellers</a>
              <a href="#" className="hover:text-blue-600">Gift boxes</a>
              <a href="#" className="hover:text-blue-600 flex items-center gap-1">
                Help <ChevronDown size={14} />
              </a>
            </nav>
          </div>
          
          {/* Language / Currency */}
          <div className="flex items-center gap-2 text-gray-600 cursor-pointer">
            <span className="font-semibold text-lg leading-none">🇩🇪</span>
            <span>Germany, EUR</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
