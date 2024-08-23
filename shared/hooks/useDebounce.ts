import {useEffect, useState} from 'react';

export const useDebounce = <T,>(value: T, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
