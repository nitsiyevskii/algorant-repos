import { createStyles } from 'src/utils/createStyles';

export const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.separator.primary,
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: theme.fonts.size.xl,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text.primary,
  },
  resetButton: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.core.primary,
    fontWeight: theme.fonts.weight.semibold,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.separator.primary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.separator.primary,
    backgroundColor: theme.colors.background.primary,
  },
  applyButton: {
    backgroundColor: theme.colors.core.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: theme.fonts.size.md,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.button.text,
  },
}));

