import { useEffect, useState } from 'react';

interface Props<T> {
  value: T;
  delay?: number;
}

// useDebounce hook은 delay 안에 값 변경 시 값을 유지하고,
// useThrottle hook은 delay마다 값의 변경이 이루어 진다.
const useDebounce = <T>({ value, delay = 500 }: Props<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
