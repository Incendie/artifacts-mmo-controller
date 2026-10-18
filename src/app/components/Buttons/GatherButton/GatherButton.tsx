'use client';

import { CHARACTER_NAME } from '@/app/constants/characters';
import { headers } from '@/app/constants/api';
import ActionButton from '../ActionButton/ActionButton';
import { gather } from '../ActionButton/actions';
import { ActionProps } from '../../Forms/MoveAction/types';

const GatherButton = ({ setError, setCooldown, setMessages }: ActionProps) => {
  const gatherAction = async () => {
    const { errorMessage, cooldownSeconds, messages } = await gather({
      CHARACTER_NAME,
      headers,
    });

    if (errorMessage) setError(errorMessage);
    if (cooldownSeconds) setCooldown(cooldownSeconds);
    if (messages.length) setMessages(messages);
  };

  return <ActionButton action={gatherAction} buttonText={'Gather'} />;
};

export default GatherButton;
