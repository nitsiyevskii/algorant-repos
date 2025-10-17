import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.separator.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  owner: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text.secondary,
  },
  description: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text.secondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text.tertiary,
  },
  languageDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
}));

