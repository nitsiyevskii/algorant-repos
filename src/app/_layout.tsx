import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="repository/[repository]"
        options={{
          title: 'Repository Details',
          headerShown: true,
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="filter"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}

