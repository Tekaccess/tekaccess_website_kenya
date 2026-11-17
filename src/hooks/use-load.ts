import { useCallback, useEffect, useState, type DependencyList } from "react";

/** One promise as {data, error, loading}; ignores results from a stale run. */
export function useLoad<T>(fn: () => Promise<T>, deps: DependencyList) {
  const [state, setState] = useState<{
    data?: T;
    error?: unknown;
    loading: boolean;
  }>({ loading: true });
  const [run, setRun] = useState(0);
  useEffect(() => {
    let live = true;
    setState((s) => ({ data: s.data, loading: true }));
    fn().then(
      (data) => live && setState({ data, loading: false }),
      (error) => live && setState({ error, loading: false }),
    );
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, run]);
  const retry = useCallback(() => setRun((n) => n + 1), []);
  return { ...state, retry };
}
