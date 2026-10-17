'use client';

import { useState } from 'react';

const ActionButton = ({ action, buttonText }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  return (
    <div>
      <button type='button' onClick={action}>
        {buttonText}
      </button>
      {message.length > 0 && <p>{message}</p>}
      {error.length > 0 && <p>{error}</p>}
    </div>
  );
};

export default ActionButton;
