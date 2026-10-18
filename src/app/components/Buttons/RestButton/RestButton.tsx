'use client';

import { CHARACTER_NAME } from '@/app/constants/characters';
import { headers } from '@/app/constants/api';
import ActionButton from '../ActionButton/ActionButton';
import { rest } from '../ActionButton/actions';
import { ActionProps } from '../../Forms/MoveAction/types';

const RestButton = ({ setError, setCooldown, setMessages }: ActionProps) => {
  const restAction = async () => {
    const { errorMessage, cooldownSeconds, messages } = await rest({
      CHARACTER_NAME,
      headers,
    });

    if (errorMessage) setError(errorMessage);
    if (cooldownSeconds) setCooldown(cooldownSeconds);
    if (messages.length) setMessages(messages);
  };

  return <ActionButton action={restAction} buttonText={'Rest'} />;
};

export default RestButton;
