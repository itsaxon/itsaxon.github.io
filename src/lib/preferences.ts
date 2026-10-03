'use client';

import { useSyncExternalStore } from 'react';

const sessionPreferences = new Map<string, string>();

function subscribe(callback: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  window.addEventListener('storage', callback);
  window.addEventListener('margin-preferences', callback);
  media.addEventListener('change', callback);
  reducedMotion.addEventListener('change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('margin-preferences', callback);
    media.removeEventListener('change', callback);
    reducedMotion.removeEventListener('change', callback);
  };
}
function getPreference(key: string) {
  try {
    return window.localStorage.getItem(key) ?? sessionPreferences.get(key) ?? null;
  } catch {
    return sessionPreferences.get(key) ?? null;
  }
}
export function savePreference(key: string, value: string) {
  sessionPreferences.set(key, value);
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* Preferences work without persistent storage. */
  }
  window.dispatchEvent(new Event('margin-preferences'));
}
export function useTheme() {
  return useSyncExternalStore(
    subscribe,
    () => {
      const saved = getPreference('theme');
      return saved === 'dark' || saved === 'light'
        ? saved
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    },
    () => 'light',
  );
}
export function useMotionChoice() {
  return useSyncExternalStore(
    subscribe,
    () => getPreference('margin-motion'),
    () => null,
  );
}

export function useSystemReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => true,
  );
}

const mobileEffectsQuery = '(max-width: 767px), (pointer: coarse)';
function subscribeMobileEffects(callback: () => void) {
  const media = window.matchMedia(mobileEffectsQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
export function useMobileEffectsDisabled() {
  return useSyncExternalStore(
    subscribeMobileEffects,
    () => window.matchMedia(mobileEffectsQuery).matches,
    () => true,
  );
}
