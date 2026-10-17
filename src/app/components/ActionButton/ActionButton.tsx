'use client';

import { useState } from 'react';

const ActionButton = ({ action, buttonText }) => {
  return (
    <div>
      <button type='button' onClick={action}>
        {buttonText}
      </button>
    </div>
  );
};

export default ActionButton;
