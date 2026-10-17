'use client';

import { CHARACTER_NAME } from '@/app/constants/characters';
import { headers } from '@/app/constants/api';
import ActionButton from '../ActionButton/ActionButton';
import { move } from '../ActionButton/actions';
import { MoveActionProps } from '../Forms/MoveAction/types';

interface MovebuttonProps extends MoveActionProps {
  x: number;
  y: number;
}

const MoveButton = ({ setError, setMessages, x, y }: MovebuttonProps) => {
  const moveAction = async () => {
    const { errorMessage, messages } = await move({
      CHARACTER_NAME,
      headers,
      x,
      y,
    });
    console.log({ errorMessage, messages });
    if (errorMessage) setError(errorMessage);
    if (messages.length) setMessages(messages);
  };

  return <ActionButton action={moveAction} buttonText={'Move'} />;
};

export default MoveButton;
