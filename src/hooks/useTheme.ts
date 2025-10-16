import { useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { lightTheme, darkTheme, Theme } from 'src/themes';

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme();
  
  const theme = useMemo(() => {
    return colorScheme === 'dark' ? darkTheme : lightTheme;
  }, [colorScheme]);
  
  return theme;
};
