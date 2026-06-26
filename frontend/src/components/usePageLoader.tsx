import { useState, useCallback } from "react";

export function usePageLoader() {
  const [loading, setLoading] = useState(false);

  const withLoader = useCallback(async (fn: () => Promise<void> | void) => {
    setLoading(true);
    try {
      await fn();
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, setLoading, withLoader };
}
