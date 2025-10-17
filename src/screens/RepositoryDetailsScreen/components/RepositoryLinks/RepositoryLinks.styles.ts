import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.separator.secondary,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.background.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  linkInfo: {
    flex: 1,
  },
  linkLabel: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text.primary,
    fontWeight: theme.fonts.weight.semibold,
    marginBottom: 4,
  },
  linkUrl: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text.tertiary,
  },
}));
