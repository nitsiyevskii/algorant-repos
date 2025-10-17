import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'src/store';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

