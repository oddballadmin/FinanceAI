import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View className="flex-1 items-center justify-center gap-3 bg-white p-6">
        <Text className="text-xl font-semibold text-slate-900">
          Page not found
        </Text>
        <Link className="text-blue-600" href="/(tabs)">
          Return to dashboard
        </Link>
      </View>
    </>
  );
}
