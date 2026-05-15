import { appThemes, type AppTheme, type AppThemeId } from '@/lib/constants';

export const DEFAULT_THEME_ID: AppThemeId = 'atlas';

export type ThemeSettings = {
  themeId: AppThemeId;
};

export type ThemeSettingsState = ThemeSettings & {
  hasHydrated: boolean;
};

export type ThemeSettingsActions = {
  resetTheme: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  setTheme: (themeId: AppThemeId) => void;
};

export type ThemeSettingsStore = ThemeSettingsState & ThemeSettingsActions;

export const isAppThemeId = (value: unknown): value is AppThemeId => {
  return (
    typeof value === 'string' && appThemes.some((theme) => theme.id === value)
  );
};

export const getThemeById = (themeId: AppThemeId): AppTheme => {
  return appThemes.find((theme) => theme.id === themeId) ?? appThemes[0];
};

export const normalizeThemeSettings = (
  settings: Partial<ThemeSettings> | undefined
): ThemeSettings => {
  return {
    themeId: isAppThemeId(settings?.themeId)
      ? settings.themeId
      : DEFAULT_THEME_ID,
  };
};
