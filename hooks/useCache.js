'use client'
import { useState } from "react";
import cacheService from "../api/cacheService";

export default function useCache(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = cacheService.get(key);
      return item ?? initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      cacheService.set(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = (value) => {
    try {
      cacheService.remove(key);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue, removeValue];
}
