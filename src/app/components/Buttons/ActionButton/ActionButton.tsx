'use client';

const ActionButton = ({ action, buttonText }) => {
  return (
    <button type='button' onClick={action}>
      {buttonText}
    </button>
  );
};

export default ActionButton;
