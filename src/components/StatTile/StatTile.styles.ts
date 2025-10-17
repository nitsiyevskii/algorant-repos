import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background.white,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.separator.secondary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: "600" as const,
    color: theme.colors.text.primary,
    marginBottom: 2,
    textAlign: "center",
  },
  label: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.fonts.weight.medium,
    textAlign: "center",
  },
}));

