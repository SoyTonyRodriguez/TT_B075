import React from 'react';

const Card = ({ card }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {card.content}
    </div>
  );
};

export default Card;
