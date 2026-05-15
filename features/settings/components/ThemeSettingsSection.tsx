import { appThemes } from '@/lib/constants';
import { useThemeSettingsStore } from '@/store/settings';
import { Check } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

export const ThemeSettingsSection = () => {
  const activeThemeId = useThemeSettingsStore((state) => state.themeId);
  const setTheme = useThemeSettingsStore((state) => state.setTheme);

  return (
    <View className="gap-3">
      {appThemes.map((theme) => {
        const isActive = activeThemeId === theme.id;

        return (
          <Pressable
            accessibilityLabel={`${theme.label} theme`}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            className={`gap-3 rounded-lg border bg-app-surface p-4 ${
              isActive ? 'border-app-primary' : 'border-app-border'
            }`}
            key={theme.id}
            onPress={() => setTheme(theme.id)}
          >
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-app-foreground">
                  {theme.label}
                </Text>
                <Text className="mt-1 text-sm text-app-secondary">
                  {theme.description}
                </Text>
              </View>

              {isActive ? (
                <View
                  accessibilityLabel="Selected theme"
                  className="h-8 w-8 items-center justify-center rounded-full bg-app-primary"
                >
                  <Check
                    color={theme.swatches.surface}
                    size={18}
                    strokeWidth={2.5}
                  />
                </View>
              ) : null}
            </View>

            <View className="flex-row gap-2">
              {Object.entries(theme.swatches).map(([name, color]) => (
                <View
                  accessibilityLabel={`${theme.label} ${name} color`}
                  className="h-8 w-8 rounded-full border border-app-border"
                  key={name}
                  style={{ backgroundColor: color }}
                />
              ))}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
