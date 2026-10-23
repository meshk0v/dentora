import { useMemo, useSyncExternalStore } from 'react';
import { loadAppointments, subscribeAppointments } from '@/lib/storage';

let version = 0;
const bump = (cb: () => void) => () => {
  version++;
  cb();
};

/** Демо-записи из localStorage с автообновлением (в т.ч. из других вкладок). */
export function useAppointments() {
  const v = useSyncExternalStore(
    (cb) => subscribeAppointments(bump(cb)),
    () => version,
  );
  return useMemo(() => loadAppointments(), [v]);
}
