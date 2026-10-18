'use client';

import { CHARACTER_NAME } from '@/app/constants/characters';
import { headers } from '@/app/constants/api';
import ActionButton from '../ActionButton/ActionButton';
import { move } from '../ActionButton/actions';
import { ActionProps } from '../../Forms/MoveAction/types';

interface MovebuttonProps extends ActionProps {
  x: number;
  y: number;
}

const MoveButton = ({
  setError,
  setCooldown,
  setMessages,
  x,
  y,
}: MovebuttonProps) => {
  const moveAction = async () => {
    const { errorMessage, cooldownSeconds, messages } = await move({
      CHARACTER_NAME,
      headers,
      x,
      y,
    });

    console.log({ cooldownSeconds });

    if (errorMessage) setError(errorMessage);
    if (cooldownSeconds) setCooldown(cooldownSeconds);
    if (messages.length) setMessages(messages);
  };

  return <ActionButton action={moveAction} buttonText={'Move'} />;
};

export default MoveButton;
