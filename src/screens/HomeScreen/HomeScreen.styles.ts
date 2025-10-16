import { createStyles } from "src/utils/createStyles";

export const useStyles = createStyles((theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.white,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: theme.colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.separator.secondary,
  },
  searchRow: {
    flexDirection: "row",
    gap: 12,
  },
  searchInput: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
}));
