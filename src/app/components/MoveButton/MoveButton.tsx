'use client';

import { CHARACTER_NAME } from '@/app/constants/characters';
import { headers } from '@/app/constants/api';
import ActionButton from '../ActionButton/ActionButton';
import { move } from '../ActionButton/actions';

interface MovebuttonProps {
  x: number;
  y: number;
}

const MoveButton = ({ x, y }: MovebuttonProps) => {
  const moveAction = () => move({ CHARACTER_NAME, headers, x, y });

  return <ActionButton action={moveAction} buttonText={'Move'} />;
};

export default MoveButton;
