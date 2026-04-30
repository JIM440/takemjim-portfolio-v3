"use client";

import { useEffect } from "react";

/**
 * Removes stale service-worker registrations after dropping `public/sw.js`.
 * No-op when nothing is registered.
 */
export function ServiceWorkerCleanup() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    void navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        void registration.unregister();
      }
    });
  }, []);

  return null;
}
