// Mock fetch globally
global.fetch = jest.fn();

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    navigate: jest.fn(),
  },
  useLocalSearchParams: jest.fn(() => ({})),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    navigate: jest.fn(),
  })),
  Stack: {
    Screen: jest.fn(({ children }) => children),
  },
  Tabs: {
    Screen: jest.fn(({ children }) => children),
  },
  usePathname: jest.fn(() => '/'),
  useSegments: jest.fn(() => []),
  Link: 'Link',
  Redirect: 'Redirect',
}));

// Mock SafeAreaView - use actual View component
jest.mock('react-native-safe-area-context', () => {
  const RN = jest.requireActual('react-native');
  return {
    SafeAreaView: RN.View,
    SafeAreaProvider: RN.View,
    useSafeAreaInsets: jest.fn(() => ({ top: 0, right: 0, bottom: 0, left: 0 })),
  };
});

// Mock @expo/vector-icons to avoid async Icon updates
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  
  const MockIcon = (props) => {
    return React.createElement(Text, { testID: props.testID || 'icon', ...props }, props.name || '');
  };
  
  return {
    Ionicons: MockIcon,
    MaterialIcons: MockIcon,
    FontAwesome: MockIcon,
    Entypo: MockIcon,
    MaterialCommunityIcons: MockIcon,
  };
});

// Suppress console errors and warnings
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('An update to Icon inside a test was not wrapped in act') ||
       args[0].includes('Warning: An update to') ||
       args[0].includes('not wrapped in act'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('An update to') ||
       args[0].includes('not wrapped in act'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

