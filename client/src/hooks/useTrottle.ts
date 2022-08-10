import { useEffect, useRef, useState } from 'react';

interface Props<T> {
  value: T;
  delay: number;
}

// useThrottle hook은 delay마다 값의 변경이 이루어 진다.
const useTrottle = <T>({ value, delay = 500 }: Props<T>) => {
  const [throttleValue, setTrottleValue] = useState<T>(value);
  const throttling = useRef(false);
  useEffect(() => {
    if (throttling.current === false) {
      setTrottleValue(value);
      throttling.current = true;
    }
    setTimeout(() => {
      if (throttling?.current) throttling.current = false;
    }, delay);
  }, [value, delay]);

  return throttleValue;
};

export default useTrottle;
