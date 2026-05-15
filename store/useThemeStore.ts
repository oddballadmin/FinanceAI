import { appThemes, type AppTheme, type AppThemeId } from '@/lib/constants';
import { create } from 'zustand';

type ThemeState = {
  activeThemeId: AppThemeId;
  activeTheme: AppTheme;
  setTheme: (themeId: AppThemeId) => void;
};

const findTheme = (themeId: AppThemeId) => {
  return appThemes.find((theme) => theme.id === themeId) ?? appThemes[0];
};

export const useThemeStore = create<ThemeState>((set) => ({
  activeThemeId: 'atlas',
  activeTheme: findTheme('atlas'),
  setTheme: (themeId) => {
    set({
      activeThemeId: themeId,
      activeTheme: findTheme(themeId),
    });
  },
}));
