import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Repositories',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="repository/[repository]"
        options={{
          title: 'Repository Details',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

