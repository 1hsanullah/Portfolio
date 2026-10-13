import { useEffect, useState } from 'react';

const format = (tz) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());

export default function useLocalTime(tz) {
  const [time, setTime] = useState(() => format(tz));
  useEffect(() => {
    const id = setInterval(() => setTime(format(tz)), 1000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}
