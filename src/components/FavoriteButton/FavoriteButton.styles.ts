import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.iconButton.background,
  },
}));

