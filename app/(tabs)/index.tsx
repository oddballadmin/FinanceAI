import { Text, View } from 'react-native';

export default function DashboardRoute() {
  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-semibold text-slate-900">Dashboard</Text>
      <Text className="mt-2 text-slate-600">
        FinanceAI app shell is ready for web, mobile, and desktop packaging.
      </Text>
    </View>
  );
}
