'use client';

import { useEffect, useState } from 'react';

const formatTime = (endsAt: Date | string): string => {
  const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
};

export const useCountdown = (endsAt?: Date | string) => {
  const [time, setTime] = useState<string | null>(() => (endsAt ? formatTime(endsAt) : null));

  useEffect(() => {
    if (!endsAt) return;
    const id = window.setInterval(() => setTime(formatTime(endsAt)), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return time;
};
