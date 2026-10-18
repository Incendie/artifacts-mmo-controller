'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

interface CooldownProps {
  cooldown: number;
}

const Cooldown = ({ cooldown }: CooldownProps) => {
  const [secondsLeft, setSecondsLeft] = useState(cooldown);
  console.log({ cooldown });
  useEffect(
    () => console.log('asdf', cooldown, secondsLeft),
    [cooldown, secondsLeft],
  );

  useLayoutEffect(() => {
    let countdown: NodeJS.Timeout;
    console.log('effect', secondsLeft);
    if (secondsLeft > 0) {
      countdown = setInterval(() => {
        setSecondsLeft(prev => prev - 1);

        if (secondsLeft <= 0) clearInterval(countdown);
      }, 1000);
    }

    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [secondsLeft]);

  useEffect(() => {
    if (cooldown) {
      //eslint-disable-next-line react-hooks/set-state-in-effect
      setSecondsLeft(cooldown);
    }
  }, [cooldown]);

  return <p>{`Cooldown: ${secondsLeft} seconds left`}</p>;
};

export default Cooldown;
