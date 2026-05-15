import '../styles/global.css';

import { useThemeStore } from '@/store';
import { Stack } from 'expo-router';
import { View } from 'react-native';

const RootLayout = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);

  return (
    <View className={`${activeTheme.className} flex-1 bg-app-background`}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'FinanceAI' }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="transaction" options={{ headerShown: false }} />
        <Stack.Screen name="mortgage" options={{ headerShown: false }} />
        <Stack.Screen name="category" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
};

export default RootLayout;
