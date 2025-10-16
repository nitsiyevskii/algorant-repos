import { TextStyle } from 'react-native';

export interface ThemeColors {
  button: {
    primary?: string;
    secondary?: string;
    disabled?: string;
    text?: string;
  };
  iconButton: {
    background?: string;
    icon?: string;
    disabled?: string;
  };
  input: {
    background?: string;
    border?: string;
    text?: string;
    placeholder?: string;
    focused?: string;
    error?: string;
  };
  text: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    label?: string;
    error?: string;
    success?: string;
  };
  textDisabled: {
    primary?: string;
    secondary?: string;
  };
  core: {
    primary?: string;
    secondary?: string;
    accent?: string;
    error?: string;
    success?: string;
    warning?: string;
    info?: string;
  };
  background: {
    white?: string;
    black?: string;
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
  modal: {
    overlay?: string;
    background?: string;
  };
  separator: {
    primary?: string;
    secondary?: string;
  };
}

export interface ThemeFonts {
  size: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  weight: {
    regular: TextStyle['fontWeight'];
    medium: TextStyle['fontWeight'];
    semibold: TextStyle['fontWeight'];
  };
  family: {
    primary: string;
  };
}

export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
}

