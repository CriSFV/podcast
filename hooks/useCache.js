"use client";
import { useState } from "react";
import cacheService from "../api/cacheService";

export default function useCache(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = cacheService.get(key, initialValue);
    return item;
  });

  const setValue = (value) => {
    setStoredValue(value);
    cacheService.set(key, value);
  };

  const removeValue = () => {
    cacheService.remove(key);
  };

  const clearCache = () => {
    cacheService.clear();
  };
  return [storedValue, setValue, removeValue, clearCache];
}
