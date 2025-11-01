
import React, { useState } from 'react';
import { MENU_DATA } from '../constants';
import { Category, Dish } from '../types';
import DishCard from './DishCard';

interface MenuProps {
  onAddToCart: (dish: Dish) => void;
}

const categories = [Category.Entrees, Category.Pates, Category.Desserts];

const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.Entrees);

  const filteredDishes = MENU_DATA.filter(dish => dish.category === selectedCategory);

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-serif text-gray-800 mb-2">Notre Menu</h2>
        <p className="text-lg text-gray-600">Saveurs authentiques d'Italie</p>
      </div>
      <div className="flex justify-center border-b-2 border-gray-200 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-3 text-lg font-medium transition-colors duration-300
              ${selectedCategory === category
                ? 'border-b-4 border-tomato-red text-tomato-red'
                : 'text-gray-500 hover:text-tomato-red'
              }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDishes.map(dish => (
          <DishCard key={dish.id} dish={dish} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
