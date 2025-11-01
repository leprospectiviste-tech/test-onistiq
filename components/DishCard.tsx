
import React from 'react';
import { Dish } from '../types';

interface DishCardProps {
  dish: Dish;
  onAddToCart: (dish: Dish) => void;
}

const DishCard: React.FC<DishCardProps> = ({ dish, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:scale-105 transition-transform duration-300">
      <img src={dish.imageUrl} alt={dish.name} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif text-gray-800 mb-2">{dish.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{dish.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-basil-green">{dish.price.toFixed(2)}€</span>
          <button
            onClick={() => onAddToCart(dish)}
            className="bg-tomato-red text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition-colors duration-300 shadow-md"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
