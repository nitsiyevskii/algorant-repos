import { createStyles } from 'src/utils/createStyles';

export const useStyles = createStyles((theme) => ({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
}));

