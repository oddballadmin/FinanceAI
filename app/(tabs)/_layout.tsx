import { Tabs } from 'expo-router';
import {
  ChartPie,
  CreditCard,
  Home,
  Landmark,
  Settings,
} from 'lucide-react-native';

const tabIconColor = (focused: boolean) => (focused ? '#0f172a' : '#64748b');

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0f172a' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused, size }) => (
            <Home color={tabIconColor(focused)} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ focused, size }) => (
            <CreditCard color={tabIconColor(focused)} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="mortgage"
        options={{
          title: 'Mortgage',
          tabBarIcon: ({ focused, size }) => (
            <Landmark color={tabIconColor(focused)} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ focused, size }) => (
            <ChartPie color={tabIconColor(focused)} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, size }) => (
            <Settings color={tabIconColor(focused)} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
