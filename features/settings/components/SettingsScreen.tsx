import { ScrollView, Text, View } from 'react-native';

import { ThemeSettingsSection } from './ThemeSettingsSection';

export const SettingsScreen = () => {
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

      <ThemeSettingsSection />
    </ScrollView>
  );
};
