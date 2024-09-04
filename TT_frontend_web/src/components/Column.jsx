import React from 'react';
import Card from './Card';

const Column = ({ column }) => {
  return (
    <div className="bg-gray-100 rounded-md shadow-md p-4 w-64">
      <h2 className="font-bold text-lg mb-4">{column.title}</h2>
      <div className="space-y-4">
        {column.cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Column;
