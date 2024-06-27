import { useEffect, useState } from "react";

export type LocalStorageResult<TData extends object> = [
  TData | undefined,
  (newValue: TData) => void,
];

function getLocalStorageValue<TData>(key: string, defaultValue: TData): TData {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return defaultValue;
}

export function useLocalStorage<TData extends object>(
  key: string,
  defaultValue?: TData,
): LocalStorageResult<TData> {
  const [value, setValue] = useState<TData | undefined>(() =>
    getLocalStorageValue(key, defaultValue),
  );

  useEffect(() => {
    setValue(getLocalStorageValue(key, defaultValue));
  }, [key, defaultValue]);

  const changeLocal = (newValue: TData) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, changeLocal];
}
