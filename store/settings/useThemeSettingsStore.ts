import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  SETTINGS_STORAGE_KEYS,
  SETTINGS_STORAGE_VERSIONS,
} from './keys';
import { zustandSettingsStorage } from './settingsStorage';
import {
  DEFAULT_THEME_ID,
  normalizeThemeSettings,
  type ThemeSettings,
  type ThemeSettingsStore,
} from './themeSettings';

export const useThemeSettingsStore = create<ThemeSettingsStore>()(
  persist(
    (set) => ({
      hasHydrated: false,
      themeId: DEFAULT_THEME_ID,
      resetTheme: () => {
        set({ themeId: DEFAULT_THEME_ID });
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated });
      },
      setTheme: (themeId) => {
        set({ themeId });
      },
    }),
    {
      merge: (persistedState, currentState) => {
        const themeSettings = normalizeThemeSettings(
          persistedState as Partial<ThemeSettings> | undefined
        );

        return {
          ...currentState,
          ...themeSettings,
        };
      },
      migrate: (persistedState) => {
        return normalizeThemeSettings(
          persistedState as Partial<ThemeSettings> | undefined
        );
      },
      name: SETTINGS_STORAGE_KEYS.theme,
      onRehydrateStorage: () => {
        return (state) => {
          state?.setHasHydrated(true);
        };
      },
      partialize: (state): ThemeSettings => ({
        themeId: state.themeId,
      }),
      storage: createJSONStorage(() => zustandSettingsStorage),
      version: SETTINGS_STORAGE_VERSIONS.theme,
    }
  )
);
