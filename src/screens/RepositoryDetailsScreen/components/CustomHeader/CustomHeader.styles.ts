import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  safeArea: {
    backgroundColor: theme.colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.separator.secondary,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  backText: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.core.primary,
    marginLeft: 4,
    fontWeight: theme.fonts.weight.medium,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  title: {
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text.primary,
    textAlign: "center",
  },
  rightContainer: {
    width: 80,
    alignItems: "flex-end",
  },
}));

