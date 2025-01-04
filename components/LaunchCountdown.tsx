'use client';

import { useEffect, useState } from 'react';

type Props = {
  dateUtc: string;
};

export default function LaunchCountdown({ dateUtc }: Props) {
  const [timeLeft, setTimeLeft] = useState('Calcul...');

  useEffect(() => {
    function updateTime() {
      const now = Date.now();
      const target = new Date(dateUtc).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft('Déjà lancé !');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}j ${hours}h ${minutes}m ${seconds}s`);
    }

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [dateUtc]);

  return (
    <div className="text-2xl font-semibold mt-2">
      {timeLeft}
    </div>
  );
}
