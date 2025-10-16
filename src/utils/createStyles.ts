import { StyleSheet } from "react-native";
import { useTheme } from "src/hooks/useTheme";
import { Theme } from "src/types/theme";

export const createStyles = <T extends StyleSheet.NamedStyles<T>>(
  styleFunction: (theme: Theme) => T
) => {
  return (): T => {
    const theme = useTheme();
    return StyleSheet.create(styleFunction(theme));
  };
};
