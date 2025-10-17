import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.separator.secondary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 36,
    marginRight: 16,
    borderWidth: 2,
    borderColor: theme.colors.separator.primary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: theme.fonts.size.xl,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  owner: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: theme.colors.background.secondary,
    gap: 4,
  },
  badgeText: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text.tertiary,
    fontWeight: theme.fonts.weight.medium,
  },
}));
