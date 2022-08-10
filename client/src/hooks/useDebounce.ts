import { useEffect, useState } from 'react';

interface Props<T> {
  value: T;
  delay?: number;
}

// 특정 시간이 지난 후 한 번만 이벤트가 실행되도록 함.
// ex) 입력이 완전히 종료되고 나서 delay 후 값 리턴
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
