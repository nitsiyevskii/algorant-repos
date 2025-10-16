import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background.primary,
  },
}));

