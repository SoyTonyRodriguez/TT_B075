import React, { useState } from 'react';
import Column from './Column';

const Board = () => {
  const [columns, setColumns] = useState([
    { id: 1, title: 'To Do', cards: [{ id: 1, content: 'Task 1' }] },
    { id: 2, title: 'In Progress', cards: [{ id: 2, content: 'Task 2' }] },
    { id: 3, title: 'Done', cards: [{ id: 3, content: 'Task 3' }] },
  ]);

  return (
    <div className="flex space-x-4 p-4">
      {columns.map(column => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default Board;