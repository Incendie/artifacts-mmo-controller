'use client';

import { CHARACTER_NAME } from '@/app/constants/characters';
import { headers } from '@/app/constants/api';
import ActionButton from '../ActionButton/ActionButton';
import { fight } from '../ActionButton/actions';
import { ActionProps } from '../../Forms/MoveAction/types';

const FightButton = ({ setError, setCooldown, setMessages }: ActionProps) => {
  const fightAction = async () => {
    const { errorMessage, cooldownSeconds, messages } = await fight({
      CHARACTER_NAME,
      headers,
    });

    if (errorMessage) setError(errorMessage);
    if (cooldownSeconds) setCooldown(cooldownSeconds);
    if (messages.length) setMessages(messages);
  };

  return <ActionButton action={fightAction} buttonText={'Fight'} />;
};

export default FightButton;
