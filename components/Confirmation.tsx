
import React from 'react';
import { CheckCircleIcon } from './Icons';

interface ConfirmationProps {
  onBackToMenu: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ onBackToMenu }) => {
  return (
    <div className="text-center p-8 md:p-12 bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
      <CheckCircleIcon className="w-20 h-20 text-basil-green mx-auto mb-6" />
      <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Merci pour votre commande !</h2>
      <p className="text-gray-600 mb-2">
        Votre commande a été reçue et est en cours de préparation.
      </p>
      <p className="text-gray-600 mb-8">
        Buon appetito!
      </p>
      <button
        onClick={onBackToMenu}
        className="bg-tomato-red text-white font-bold py-3 px-8 rounded-full hover:bg-red-600 transition-colors duration-300 text-lg"
      >
        Nouvelle Commande
      </button>
    </div>
  );
};

export default Confirmation;
