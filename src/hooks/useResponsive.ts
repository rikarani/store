import { useCallback, useSyncExternalStore } from "react";

type Callback = (callback: VoidFunction) => VoidFunction;

export function useResponsive(query: string) {
  const subscribe = useCallback<Callback>(
    (callback) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query],
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return false;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
