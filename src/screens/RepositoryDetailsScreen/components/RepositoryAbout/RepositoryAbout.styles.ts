import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text.tertiary,
    marginBottom: 2,
  },
  value: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text.primary,
    fontWeight: theme.fonts.weight.medium,
  },
  topicsContainer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.separator.secondary,
  },
  topicsLabel: {
    fontSize: theme.fonts.size.md,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  topics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  topic: {
    backgroundColor: theme.colors.core.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  topicText: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.button.text,
    fontWeight: theme.fonts.weight.medium,
  },
}));
