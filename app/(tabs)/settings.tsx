import { appThemes } from '@/lib/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { Pressable, ScrollView, Text, View } from 'react-native';

const SettingsRoute = () => {
  const activeThemeId = useThemeStore((state) => state.activeThemeId);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <ScrollView
      className="flex-1 bg-app-background"
      contentContainerClassName="gap-5 p-6"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View>
        <Text className="text-2xl font-semibold text-app-foreground">
          Settings
        </Text>
        <Text className="mt-2 text-app-secondary">
          Choose a saved palette for the FinanceAI interface.
        </Text>
      </View>

      <View className="gap-3">
        {appThemes.map((theme) => (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: activeThemeId === theme.id }}
            className={`gap-3 rounded-xl border bg-app-surface p-4 ${
              activeThemeId === theme.id
                ? 'border-app-primary'
                : 'border-app-border'
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

              {activeThemeId === theme.id ? (
                <Text className="text-sm font-semibold text-app-primary">
                  Active
                </Text>
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
        ))}
      </View>
    </ScrollView>
  );
};

export default SettingsRoute;
