import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue, validate = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (validate(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      // Continue with sample data when storage is unavailable or invalid.
    }

    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // The dashboard still works when browser storage is unavailable.
    }
  }, [key, value]);

  return [value, setValue];
}
