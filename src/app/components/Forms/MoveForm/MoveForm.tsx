'use client';

import { useState } from 'react';
import MoveButton from '../../MoveButton/MoveButton';

const MoveForm = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleX = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    setX(Number(event.target.value));
  };

  const handleY = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    setY(Number(event.target.value));
  };

  return (
    <form action='moveCharacter'>
      <label htmlFor='moveX'>X</label>
      <input type='number' id='moveX' onChange={handleX} value={x} />
      <label htmlFor='moveY'>Y</label>
      <input type='number' id='moveY' onChange={handleY} />
      <MoveButton x={x} y={y} />
    </form>
  );
};

export default MoveForm;
