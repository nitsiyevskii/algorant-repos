import { Theme } from 'src/types/theme';
import { colors } from './colors';
import { fonts } from './fonts';

export const lightTheme: Theme = {
  colors,
  fonts,
};

export const darkTheme: Theme = {
  colors: {
    ...colors,
    text: {
      primary: '#FFFFFF',
      secondary: '#E9EAE9',
      tertiary: '#BEC0C4',
      label: '#FFFFFF',
      error: '#FF453A',
      success: '#32D74B',
    },
    background: {
      white: '#000000',
      black: '#FFFFFF',
      primary: '#1C1C1E',
      secondary: '#2C2C2E',
      tertiary: '#3A3A3C',
    },
    input: {
      background: '#1C1C1E',
      border: '#3A3A3C',
      text: '#FFFFFF',
      placeholder: '#8E8E93',
      focused: '#0A84FF',
      error: '#FF453A',
    },
    button: {
      primary: '#0A84FF',
      secondary: '#5E5CE6',
      disabled: '#3A3A3C',
      text: '#FFFFFF',
    },
    iconButton: {
      background: '#2C2C2E',
      icon: '#FFFFFF',
      disabled: '#3A3A3C',
    },
    core: {
      primary: '#0A84FF',
      secondary: '#5E5CE6',
      accent: '#FF9F0A',
      error: '#FF453A',
      success: '#32D74B',
      warning: '#FF9F0A',
      info: '#64D2FF',
    },
    modal: {
      overlay: 'rgba(0, 0, 0, 0.75)',
      background: '#1C1C1E',
    },
    separator: {
      primary: '#38383A',
      secondary: '#48484A',
    },
    textDisabled: {
      primary: '#3A3A3C',
      secondary: '#48484A',
    },
  },
  fonts,
};

export { colors } from './colors';
export { fonts } from './fonts';

export type { Theme, ThemeColors, ThemeFonts } from 'src/types/theme';
