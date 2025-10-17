import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  description: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text.secondary,
    lineHeight: 22,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.colors.background.white,
  },
}));
