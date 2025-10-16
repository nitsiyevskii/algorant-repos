import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  message: {
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text.secondary,
    textAlign: "center",
    marginTop: 16,
    fontWeight: theme.fonts.weight.medium,
  },
  description: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text.tertiary,
    textAlign: "center",
    marginTop: 8,
  },
}));

