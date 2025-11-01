
import React from 'react';
import { ShoppingCartIcon } from './Icons';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-serif text-tomato-red">
          La Dolce Vita
        </h1>
        <button
          onClick={onCartClick}
          className="relative text-gray-700 hover:text-tomato-red transition-colors duration-300 p-2"
          aria-label="Voir le panier"
        >
          <ShoppingCartIcon className="h-8 w-8" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-basil-green text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
