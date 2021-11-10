import { useState } from 'react';

import cookie, { CookieSerializeOptions, CookieParseOptions } from 'cookie';

interface useCookieStateOptionsProps {
  decodeOps: CookieParseOptions;
  encodeOps: CookieSerializeOptions;
}

export function useCookieState<T>(
  key: string,
  initialValue: T,
  options?: useCookieStateOptionsProps
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const value = cookie.parse(document.cookie || '', options?.decodeOps);

      return (JSON.parse(value[key]) as T) ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      document.cookie = cookie.serialize(key, JSON.stringify(valueToStore), options?.encodeOps);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}
