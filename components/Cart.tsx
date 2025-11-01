
import React, { useState, useMemo } from 'react';
import { CartItem, OrderType } from '../types';
import { ClockIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (dishId: number, newQuantity: number) => void;
  onPlaceOrder: () => void;
  onBackToMenu: () => void;
}

const generateTimeSlots = () => {
  const slots = [];
  const now = new Date();
  // Start from the next half hour
  now.setMinutes(now.getMinutes() + (30 - (now.getMinutes() % 30)));
  now.setSeconds(0);
  now.setMilliseconds(0);

  for (let i = 0; i < 10; i++) {
    const time = new Date(now.getTime() + i * 15 * 60000); // 15 minute intervals
    if(time.getHours() >= 12 && time.getHours() < 14 || time.getHours() >= 19 && time.getHours() < 22){
        slots.push(time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    }
  }
  return slots;
};

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateQuantity, onPlaceOrder, onBackToMenu }) => {
  const [orderType, setOrderType] = useState<OrderType>(OrderType.Takeout);
  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0] || '');

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  }, [cartItems]);
  
  const deliveryFee = orderType === OrderType.Delivery ? 3.50 : 0;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-serif mb-4">Votre panier est vide</h2>
        <p className="text-gray-600 mb-6">Ajoutez quelques plats délicieux de notre menu !</p>
        <button onClick={onBackToMenu} className="bg-basil-green text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-colors duration-300">
          Retour au Menu
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif text-center mb-6 text-gray-800">Votre Commande</h2>

      <div className="divide-y divide-gray-200">
        {cartItems.map(item => (
          <div key={item.dish.id} className="flex items-center py-4">
            <img src={item.dish.imageUrl} alt={item.dish.name} className="w-20 h-20 object-cover rounded-md mr-4" />
            <div className="flex-grow">
              <h3 className="font-bold text-lg">{item.dish.name}</h3>
              <p className="text-gray-500">{item.dish.price.toFixed(2)}€</p>
            </div>
            <div className="flex items-center">
              <button onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)} className="p-1 rounded-full text-gray-600 hover:bg-gray-100"><MinusIcon className="w-5 h-5"/></button>
              <span className="w-10 text-center font-bold">{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)} className="p-1 rounded-full text-gray-600 hover:bg-gray-100"><PlusIcon className="w-5 h-5"/></button>
            </div>
            <div className="ml-4 font-bold w-20 text-right">
              {(item.dish.price * item.quantity).toFixed(2)}€
            </div>
             <button onClick={() => onUpdateQuantity(item.dish.id, 0)} className="ml-4 text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Options</h3>
          <div className="flex space-x-4 mb-6">
            {[OrderType.Takeout, OrderType.Delivery].map(type => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`flex-1 py-3 px-4 rounded-lg text-center font-semibold transition-all duration-300 ${
                  orderType === type
                    ? 'bg-tomato-red text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <label htmlFor="time-slot" className="block font-semibold mb-2 text-gray-700">Créneau horaire</label>
          <div className="relative">
             <ClockIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              id="time-slot"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-basil-green focus:border-basil-green appearance-none"
            >
              {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
            </select>
          </div>
        </div>
        <div>
            <h3 className="font-bold text-lg mb-4">Total</h3>
            <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                    <span>Frais de livraison</span>
                    <span>{deliveryFee.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between font-bold text-xl mt-4 pt-2 border-t">
                    <span>Total</span>
                    <span>{total.toFixed(2)}€</span>
                </div>
            </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <button onClick={onBackToMenu} className="text-basil-green font-bold hover:underline">
          &larr; Continuer les achats
        </button>
        <button
          onClick={onPlaceOrder}
          className="w-full md:w-auto bg-basil-green text-white font-bold py-3 px-12 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-lg text-lg"
        >
          Payer
        </button>
      </div>
    </div>
  );
};

export default Cart;
