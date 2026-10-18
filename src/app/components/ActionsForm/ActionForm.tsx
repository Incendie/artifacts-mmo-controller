'use client';

import { useState } from 'react';
import MoveAction from '../Forms/MoveAction/MoveAction';
import FightAction from '../Forms/FightAction/FightAction';
import RestAction from '../Forms/RestAction.tsx/RestAction';
import Cooldown from '../Cooldown/Cooldown';
import GatherAction from '../Forms/GatherAction/GatherAction';

const ActionsForm = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  return (
    <div>
      <Cooldown cooldown={cooldown} />
      {messages.length > 0 &&
        messages.map((message: string, key) => <p key={key}>{message}</p>)}
      {error.length > 0 && <p>{error}</p>}
      <MoveAction
        setError={setError}
        setMessages={setMessages}
        setCooldown={setCooldown}
      />
      <FightAction
        setError={setError}
        setMessages={setMessages}
        setCooldown={setCooldown}
      />
      <RestAction
        setError={setError}
        setMessages={setMessages}
        setCooldown={setCooldown}
      />
      <GatherAction
        setError={setError}
        setMessages={setMessages}
        setCooldown={setCooldown}
      />
    </div>
  );
};

export default ActionsForm;
