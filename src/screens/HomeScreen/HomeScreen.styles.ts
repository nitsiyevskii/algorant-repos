import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: theme.colors.background.white,
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: theme.fonts.size.md,
    textAlign: "center",
    fontWeight: theme.fonts.weight.regular,
    marginTop: 8,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.size.xxl,
    fontWeight: theme.fonts.weight.semibold,
    marginBottom: 10,
    textAlign: "center",
  },
  welcomeText: {
    color: theme.colors.core.primary,
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.medium,
    marginTop: 16,
  },
  signOutContainer: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
}));
