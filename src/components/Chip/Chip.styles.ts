import { createStyles } from 'src/utils/createStyles';

export const useStyles = createStyles((theme) => ({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.separator.primary,
  },
  chipActive: {
    backgroundColor: theme.colors.core.primary,
    borderColor: theme.colors.core.primary,
  },
  chipText: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text.primary,
    fontWeight: theme.fonts.weight.medium,
  },
  chipTextActive: {
    color: theme.colors.button.text,
  },
}));

