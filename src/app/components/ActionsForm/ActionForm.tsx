'use client';

import { useState } from 'react';
import MoveAction from '../Forms/MoveAction/MoveAction';
import { randomUUID } from 'crypto';

const ActionsForm = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  return (
    <div>
      <MoveAction setError={setError} setMessages={setMessages} />
      {messages.length > 0 &&
        messages.map((message: string, key) => <p key={key}>{message}</p>)}
      {error.length > 0 && <p>{error}</p>}
    </div>
  );
};

export default ActionsForm;
