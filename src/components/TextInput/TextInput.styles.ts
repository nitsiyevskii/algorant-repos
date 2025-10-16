import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: theme.colors.input.background,
    borderColor: theme.colors.input.border,
  },
  leftIconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    color: theme.colors.input.text,
    fontSize: theme.fonts.size.md,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
}));

